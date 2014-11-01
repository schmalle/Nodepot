var server = require("./server");

var config = require('/etc/nodepot/config');

console.log("Starting Nodepot in " + config.mode  + " mode ");
console.log("Starting Nodepot listening on local port " + config.port);

server.start();


