/// <reference types="cypress" />

import { shotAndSave } from "./_shot.js";
import { test } from "./_utils.js";

const page = {
  "name": "top",
  "path": "index.html"
};
const max_reload = 100;
let count = 0;

describe(`ページを${max_reload}回表示`, () => {
  const st = {};
  beforeEach(() => {
    cy.fixture("settings.json")
      .then(o => {
        const keys = Object.keys(o);
        for(let i = 0; i < keys.length; i++){
          const key = keys[i];
          st[key] = o[key];
        }
      });
  });
  afterEach(function(){
    const test = this.currentTest;
    const test_obj = {isError: false};
    if(test.state === "failed"){
      test_obj.isError = true;
    }
    test_obj.test = test;
    shotAndSave(cy, {name: "test"}, test_obj);
  });

  context("PC", () => {
    for(let i = 0; i < max_reload; i++){
      it(`${page.name} / ${page.path}`, () =>{
        cy.visit(`${st.base_url}${page.path}`, {failOnStatusCode: false})
          .get('body')
          .then((body) => {
            let error = false;
            if (body.find("h1").length > 0) {
              cy.wrap(body)
                .find("h1")
                .invoke("text")
                .then(function(str){
                  if(str === st.notfound.text){
                    error = str;
                  }
                  return error;
                });
            }else{
              return error;
            }
          })
          .then(function(error){
            cy.url()
              .should(purl => {
                expect(purl.match(page.path)).to.ok;
                expect(error).to.false;
              });
          });

      });
    }
  });

});
