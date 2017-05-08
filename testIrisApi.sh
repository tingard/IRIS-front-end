echo -e "Starting Mongodb"
mongodb-runner start && echo " " && node src/server/index.js
echo -e "Stopping mongodb"
mongodb-runner stop
