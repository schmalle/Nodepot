var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require('path');
var ana = require("./analyzer");
var config = require('./template/config');
var S = require('string');




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

        var query = request.url;
        var ip = request.connection.remoteAddress;

        // admin check (query and IP range)
        if ((query == "/admin" || query == "admin") && (S(ip).contains("127.0.0.1") || S(ip).contains(config.home_ip)))
        {
            // show UI

            var defaultTemplateStart = fs.readFileSync('./html/adminstart.html', 'utf8');
            var learnedStuff = fs.readFileSync("/var/log/nodepot.log", 'utf8');
            var defaultTemplateEnd = fs.readFileSync('./html/adminend.html', 'utf8');
            response.write(defaultTemplateStart);
            response.write(learnedStuff);
            response.write(defaultTemplateEnd);

        }
        else
        {  /* default analyze case */

            /* check if the request contains an .. code */
            statusAnalyze = ana.analyze(request, response);

            var defaultTemplate = fs.readFileSync('./html/demo.html', 'utf8');
            var learnedStuff = fs.readFileSync('./html/dork.html', 'utf8');

            response.write(defaultTemplate);
            response.write(learnedStuff);

        }
        response.end();
    }

    http.createServer(onRequest).listen(config.port);
    console.log("Server has started.");
}

exports.start = start;