var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require('path');
var ana = require("./analyzer");
var config = require('./template/config')



var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};



function start() {
    function onRequest(request, response) {

        /* set the correct content type */
        response.writeHead(200, {"Content-Type": "text/html"});

        /* check if the request contains an .. code */
        statusAnalyze = ana.analyze(request, response);

        var defaultTemplate = fs.readFileSync('./html/demo.html','utf8');
        var learnedStuff = fs.readFileSync('./html/dork.html','utf8');

        response.write(defaultTemplate);
        response.write(learnedStuff);
        response.end();
    }

    http.createServer(onRequest).listen(config.port);
    console.log("Server has started.");
}

exports.start = start;