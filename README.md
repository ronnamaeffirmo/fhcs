# FHCS api & client

> API & client code for inventory and sales of Fieldstone Hardware and Construction Supplies system.

## Prerequisites
  ```
  node.js version: ^10.13.0
  yarn version: >= 0.18.0
  ```

## Installing
  1. Make sure you have [node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/en/) installed.

  2. Clone this repo to your local machine using [https://bitbucket.org/gamr/fhcs/src/master/]().
  3. Install your dependencies on both api & client 
      ```
      cd path/to/fhcs
      yarn
      cd path/to/fhcs/client
      yarn
      ```
  4. Start your app. 
      
      Start with concurrently
      ```shell
      cd path/to/fhcs
      yarn dev
      ```
      Start manually
      ```shell
      cd path/to/fhcs
      yarn start

      cd path/to/fhcs/client
      yarn start
      ``` 

## Running Test
Make sure you run yarn.

1. For server testing
    ```
    cd path/to/fhcs
    yarn run test
    ```
2. For client testing.
    ```
    cd path/to/fhcs/client
    yarn run test
    ```

3. Pipelines at https://bitbucket.org/gamr/fhcs/addon/pipelines/home

  ### End to End testing
  
  We used the following tools for testing the app:
  
  [mocha.js](https://mochajs.org) - making asynchronous testing simple and fun.

  [chai.js](https://www.chaijs.com/) - a BDD / TDD assertion library for node and the browser 
  
  [enzyme](https://github.com/airbnb/enzyme) -a JavaScript Testing utility for React that makes it easier to test your React Components output.

  [sinon.js](https://sinonjs.org/) - standalone test spies, stubs and mocks for JavaScript. 
  
  ### Coding style tests

  We used JavaScript style guide, linter, and formatter, more information at [standardjs](https://standardjs.com/#javascript-style-guide-linter-and-formatter).

  
  Some Rules:

  2 spaces – for indentation

  Single quotes for strings – except to avoid escaping

  No unused variables – this one catches tons of bugs!

  No semicolons

  Sample code testing:
  ```
    it('renders <CustomerForm/> components', () => {
      const wrapper = shallow(<App />)
      expect(wrapper.find(CustomerForm)).toHaveLength(1)
    })
  ```
## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Built With
  [feathers.js](https://feathersjs.com/) - a REST and real-time API layer for Node.js, React Native and the browser.

  [react.js](https://reactjs.org/) - a JavaScript library for building user interfaces.

  [mongodb](https://www.mongodb.com/) - classified as a NoSQL database program.

  [redux.js](https://redux.js.org/) - an open-source JavaScript library for managing application state

## Contributing
Please refer to each project's style and contribution guidelines for submitting patches and additions. 

  
  1. **Clone** this repo to your local machine at https://bitbucket.org/gamr/fhcs/src/master/.

 
  2. **Select** a feature request in JIRA and make your own feature **Branch**.

  3. **Commit** changes to your own branch using commitizen (git-cz).

  4. **Push** your work to your branch.

  5. Run **Testing**.

  6. Submit a **Pull Request** so that we can review your changes.
  
  7. **Code review** and if the test passed, **merge** to master after consensus.
    
  **NOTE:** Be sure to merge the latest from "upstream" before making a pull request!

## Versioning

  We use git for versioning. Visit [git](https://git-scm.com/) for more information.

## Changelog

__0.1.0__

- Initial release

## Developers

  **Onboarding**

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
