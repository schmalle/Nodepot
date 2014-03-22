var http = require("http");
var url = require("url");
var fs = require("fs");
var ana = require("./analyzer");

function start(port) {
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

    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}

exports.start = start;