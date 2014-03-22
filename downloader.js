var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

var downloadfile = "http://nodejs.org/dist/node-v0.2.6.tar.gz";

var host = url.parse(downloadfile).hostname
var filename = url.parse(downloadfile).pathname.split("/").pop()

var theurl = http.createClient(80, host);
var requestUrl = downloadfile;
sys.puts("Downloading file: " + filename);
sys.puts("Before download request");
var request = theurl.request('GET', requestUrl, {"host": host});
request.end();

var dlprogress = 0;


setInterval(function () {
    sys.puts("Download progress: " + dlprogress + " bytes");
}, 1000);


request.addListener('response', function (response) {
    response.setEncoding('binary')
    sys.puts("File size: " + response.headers['content-length'] + " bytes.")
    var body = '';
    response.addListener('data', function (chunk) {
        dlprogress += chunk.length;
        body += chunk;
    });
    response.addListener("end", function() {
        fs.writeFileSync(filename, body, 'binary');
        sys.puts("After download finished");
    });

});