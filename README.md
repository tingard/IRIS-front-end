# IRIS

## Building

Once you've cloned/forked the git repo, make sure you're on a compatible version of node (6.10.2 to be safe).

Use yarn, it's better than npm :wink:

`yarn install` will install dependancies

`yarn start` will build the site using magic, then `node src/server/index.js` will set the server running.

Having two commands is  a pain but I cba doing it nicely in webpack for the time being, and don't want yet more requirements.

## Contributing

Thanks for your support! IRIS is starting to build in complexity so the more people contributing the better. To make everyone's lives easier we have some coding standards to stick to.

### Linting
IRIS uses ESLint to help enforce a pretty generic code style. Whenever you run `yarn start` or `yarn test`, linting will happen and you may see some errors or warnings to correct. You should also be able to tell your editor to point to the correct linting file if you want it all in one place.

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
