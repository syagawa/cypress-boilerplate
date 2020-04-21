import path from "path";

function getParent(o){
  if(!o.parent){
    return o;
  }
  return getParent(o.parent);
}

let dirname;
let count = 0;
let d;
function shotAndSave(cy, page, test_obj){
  if(!d){
    d = new Date();
  }

  dirname = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${String(d.getHours()).padStart(2,"0")}${String(d.getMinutes()).padStart(2,"0")}-${String(d.getSeconds()).padStart(2,"0")}`;
  count++;

  let prefix = "passed-";
  let is_error = (test_obj && test_obj.isError) ? true : false;
  if(is_error){
    // cy.debug();
    prefix = "failed-";

    // todo save error log
    // error.obj.message;
    // error.obj.name;
    // error.obj.stack;
    
  }

  let pname = page.name ? page.name.split(" ").join("_").split("/").join("") : "unknown";
  const name = `${prefix}${String(count).padStart(5, "0")}-${pname}`;


  cy.window()
    .then(win => {
      const height = win.document.body.scrollHeight;
      let option = null;
      if(height >= 10000){
        option = {
          capture: "runner"
        };
      }
      if(option){
        cy.screenshot(`${dirname}/${name}`, option);
      }else{
        cy.screenshot(`${dirname}/${name}`);
      }

      if(is_error){
        const err_str = JSON.stringify(test_obj.test.err);
        

        const filepath = getParent(test_obj.test).file;
        let filepath_arr;
        const backslash = /\\/.test(filepath);
        if(backslash){
          filepath_arr = filepath.split("\\");
        }else{
          filepath_arr = filepath.split("/");
        }
        const shotdir = Cypress.config().screenshotsFolder;
        const project_dir = Cypress.config().spec.name.replace(/[\s\/\\].*\..+$/,"");
        cy.writeFile(`${shotdir}/${project_dir}/${filepath_arr[filepath_arr.length - 1]}/${dirname}/${name}.txt`, err_str);
      }


    });
  
  
  

  }

export default {
  shotAndSave: shotAndSave
};