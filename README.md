# IRIS

## Prerequisites
This readme will assume that the reader has already setup a working
node/react development environment. Node `~8.10.0` is required,
installable via nvm or any other node version manager.

Yarn is a package manager which is considered by many to be faster and more secure than npm. Running the installation script is the easiest way to add it to your system:

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Windows users can install [here](https://yarnpkg.com/latest.msi).


## Building

### Notes on Git

While we believe case sensitive file names have been eliminated, it may be needed for OS X users to tell git to ignore cases:

``` bash
git config core.ignorecase true
```

Navigate to your IRIS directory, then `yarn install` will install dependencies

The best way to get started is to run `yarn start`, which will start a server using poijs and webpack to watch for file changes and perform linting and compiling automagically.

### Linting

IRIS uses ESLint to help enforce a slightly modified AirBNB coding style, described in the eslintConfig section of the package.json file. Whenever you run `yarn test`, linting will happen and you may see some errors or warnings to correct.

If you're on the correct version of node, you can use `npx eslint src` from the command line to lint too.

### Tests

Each component should ideally have a `<comp>.spec.jsx` test file, we use Jest and Enzyme to test, but the syntax is very similar to Mocha. More info on Jest can be found [here](https://jestjs.io).

#### Testing best practises:

Step 1: Read [this](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/).
Step 2: `yarn test`


## Structure of IRIS
<!-- should be common to all READMEs of IRIS -->

IRIS has two main components: an API and a separate front-end. The API is written using Express and run on Node, and a different Express server provides the React frontend to users.

## Contributing

Thanks for your support! IRIS is starting to build in complexity so the more people contributing the better. To make everyone's lives easier we have some coding standards to stick to.
