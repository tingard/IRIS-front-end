# IRIS

## Notes on Git
While we believe case sensitive file names have been eliminated, it may be needed for OS X users to tell git to ignore cases:

``` bash
git config core.ignorecase true
```

## Prerequisites
This readme will assume that the reader has already setup a working
node/react development environment. Node version 6.9.1 is recommended,
installable via nvm or any other node version manager.

* yarn

	Yarn is a package manager which is considered by many to be faster and more secure than npm. Running the installation script is the easiest way to add it to your system:

    ```bash
    curl -o- -L https://yarnpkg.com/install.sh | bash
    ```

    Windows users can install [here](https://yarnpkg.com/latest.msi).


## Building


Navigate to your IRIS directory, then `yarn install` will install dependencies

The best way to get started is to run `yarn start`, which will start a server using nodemon to watch for file changes and perform linting and compiling automagically.

Other running options can be used, check `package.json` for the list.

### Linting

IRIS uses ESLint to help enforce a slightly modified AirBNB coding style, described in the eslintConfig section of the package.json file. Whenever you run `yarn start` or `yarn test`, linting will happen and you may see some errors or warnings to correct. You should also be able to tell your editor to point to the correct linting file if you want it all in one place.

It is also possible to start linting from the lint script in
gulpfile.babel.js.


### Tests

Each component should have a `<comp>.spec.jsx` test file, we use Jest and Enzyme to test, but the syntax is very similar to Mocha. More info on Jest can be found [here](https://github.com/verekia/js-stack-from-scratch/blob/master/tutorial/02-babel-es6-eslint-flow-jest-husky.md#readme).

#### Testing best practises:
 - be explicit with descriptions of what the test does
 - try to be fairly thorough, what could break the component?

To run all tests use `yarn test`


## Structure of IRIS
<!-- should be common to all READMEs of IRIS -->

IRIS has two main components: an API and a separate front-end. The API is written using Express and run on Node, and a different Express server provides the React frontend to users.

## Contributing

Thanks for your support! IRIS is starting to build in complexity so the more people contributing the better. To make everyone's lives easier we have some coding standards to stick to.
