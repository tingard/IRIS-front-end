echo -e "Starting Mongodb"
mongodb-runner start && echo " " && nodemon src/server/index.js
echo -e "Stopping mongodb"
mongodb-runner stop
