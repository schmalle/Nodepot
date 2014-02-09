var http = require("http");
var url = require("url");
var fs = require("fs");
var ana = require("./analyzer");

function start(port) {
    function onRequest(request, response) {

        /* check if the request contains an .. code */
        statusAnalyze = ana.analyze(request, response);

        var text = fs.readFileSync('./html/demo.html','utf8')

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Hello World");
        response.write(text);
        response.end();
    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}

exports.start = start;