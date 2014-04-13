var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

var S = require('string');
var db = require("./db");





/*
 download export function
 url
 dest    target file name
 cb      call back
 */
function downloadStep2(url, dest, cb)
{

    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close();
            cb();
        });
    });
}

/*
 download export function
 url
 dest    target file name
 cb      call back
 */
exports.download = function (url, dest, cb)
{
    url = S(url).toLowerCase(url);
    db.isMemberMaliciousURL(url, dest, downloadStep2, cb);
}

exports.downloadStep2 = downloadStep2;