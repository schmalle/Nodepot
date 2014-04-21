var server = require("./server");

var runner = 0;
var config = require('/opt/nodepot/config');
var configFileName = "";


console.log("Starting Nodepot in " + config.mode  + " mode ");

server.start();


