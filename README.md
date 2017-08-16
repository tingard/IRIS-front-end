# IRIS

## Notes on Git
While we believe case sensitive file names have been eliminated, it may
be prudent for OS X users to tell git to ignore cases:

``` bash
git config core.ignorecase true
```

## Prerequisites
This readme will assume that the reader has already setup a working
node/react development environment. Node version 6.9.1 is recommended,
installable via nvm or any other node version manager.

* yarn

    Yarn is a very new package manager which is considered by many to be
    faster and more secure than npm. Running the installation script is
    the easiest way to add it to your system:

    ```bash
    curl -o- -L https://yarnpkg.com/install.sh | bash
    ```

    Use yarn, it's better than npm :wink:

    Also, good luck installing the dependencies without it :wink:

* postman

    Postman is a tool designed to aid in API development. Allows us to
    create test users for the IRIS service. Installation is simple,
    follow the [link](http://www.getpostman.com) and select the correct
    OS

## Building


Navigate to your IRIS directory, then `yarn install` will install dependencies

`yarn start` will then build the website, accessible through http://localhost:3000/

`yarn runserver` will then start a mongodb database and the server

Having two commands is  a pain but I cba doing it nicely in webpack for the time being, and don't want yet more requirements.

### Linting
IRIS uses ESLint to help enforce a slightly modified AirBNB coding style,
described in the eslintConfig section of the package.json file. Whenever
you run `yarn start` or `yarn test`, linting will happen and you may see
some errors or warnings to correct. You should also be able to tell your
editor to point to the correct linting file if you want it all in one
place.

It is also possible to start linting from the lint script in
gulpfile.babel.js.

yarn tests are run without compiling, therefore it will run without compiling

`TIM PLEASE MAKE THIS MORE CLEAR`



### Tests

Each component should have a `<comp>.spec.jsx` test file, we use Jest to test, but the syntax is very similar to Mocha. More info on Jest can be found [here](https://github.com/verekia/js-stack-from-scratch/blob/master/tutorial/02-babel-es6-eslint-flow-jest-husky.md#readme).

#### Testing best practises:
 - be explicit with descriptions of what the test does
 - try to be fairly thorough, what could break the component?

To run tests, simply use `yarn test`


## Structure of IRIS

IRIS has two main components, an API running at [grapheel.com/app/api](http://www.grapheel.com/app/api), and a frontend you access through [grapheel.com/app](http://grapheel.com/app). The API is written using Express and run on Node, and the same server provides the React frontend to users.

### API


### React Frontend

#### Volunteer Side
#### BVI side

## Contributing

Thanks for your support! IRIS is starting to build in complexity so the more people contributing the better. To make everyone's lives easier we have some coding standards to stick to.



