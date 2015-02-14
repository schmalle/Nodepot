var server = require("./server");

//
// check for config file from command line
//

var myArgs = process.argv;
var configNew = myArgs[2];
if (configNew != undefined) {
    console.log("Found optional path to config file " + configNew);
}
else
{
    configNew = '/etc/nodepot/config';
}

var config = require(configNew);

console.log("Starting Nodepot in " + config.mode  + " mode ");
console.log("Starting Nodepot listening on local port " + config.port);

server.start(configNew);


