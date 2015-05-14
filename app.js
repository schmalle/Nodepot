var server = require("./servercore");

//
// Nodepot main start file
//

//
// Priorities for configfile
//
// 1. CommandLine
// 2. OpenShift location
// 3. Hardcoded location
//

var myArgs = process.argv;
var configNew = myArgs[2];

// get data directory for OpenShift (easy check, if we run in Openshift)
var openShiftDataDir = process.env.OPENSHIFT_DATA_DIR;

if (configNew != undefined) {
    console.log("Found optional path to config file " + configNew);
}
else if (openShiftDataDir != undefined)
{
    configNew = openShiftDataDir + "/config";
}
else
{
    configNew = '/etc/nodepot/config';
}


var config = require(configNew);

if (openShiftDataDir != undefined)
{
    config.port = process.env.OPENSHIFT_NODEJS_PORT;
    console.log("Nodepot (app.js): Starting DB client with ip/port server " + process.env.OPENSHIFT_REDIS_PORT + " : " + process.env.OPENSHIFT_REDIS_HOST);
}


console.log("Starting nodepot with config from file " + configNew);
console.log("Starting Nodepot in " + config.mode  + " mode ");
console.log("Starting Nodepot listening on local port " + config.port);

server.start(configNew);


