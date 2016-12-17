# IRIS

## Building

Use yarn, it's better than npm :wink:

`yarn install` will install dependancies

`yarn start` will build the site using magic, then `node src/server/index.js` will set the server running.

Having two commands is  a pain but I cba doing it nicely in webpack for the time being, and don't want yet more requirements. Instead use `hotload.sh` to run the two at the same time, with the server in the background. Don't forget to use `fg` to bring it to the front when you want to stop the site running.
