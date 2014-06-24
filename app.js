var server = require("./server");

var config = require('/etc/nodepot/config');


console.log("Starting Nodepot in " + config.mode  + " mode ");

server.start();


