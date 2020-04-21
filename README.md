# Cypress Test Boilerplate

## Requirements

* Node.js
* Chrome
## Install
```
$ npm install
```

## Setting

1. settings.json
    ```
    $ cp cypress/fixtures/_sample_settings.json cypress/fixtures/settings.json
    ```
2. input base_url in settings.json

## Start

### GUI
      ```
      $ npx cypress open
      ```

### CUI
      ```
      $ npx cypress run --spec "cypress/integration/xxx/xxx.js" -b chrome

      # headless mode
      $ npx cypress run --spec "cypress/integration/xxx/xxx.js" -b chrome --headless
      ```
