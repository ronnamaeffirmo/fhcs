# fhcs api & client

> API & client code for Fieldstone&#39;s system

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/en/) installed.
2. Install your dependencies on both api & client

    ```shell
    cd path/to/fhcs
    yarn
    
    cd path/to/fhcs/client
    yarn
    ```

3. Start your app  
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

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## Authors

* **Marlon John Ynion**
* **Ronna Mae Firmo**
* **Angel Lou Baladhay**
* **Gabriel Dennis Parangan**

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
