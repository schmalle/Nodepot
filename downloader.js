var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

var exec = require('child_process').exec;


var S = require('string');
var db = require("./db");
var config = require('/opt/nodepot/config');



function finishCallBack(url, dest)
{
    console.log("Finished downloading: " + url + " to location " + dest);
}


function executer(command)
{
    var child = exec(command,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}

/*
 download export function executed only, if URL is not known yet
 url
 dest    target file name
 cb      call back
 */
function downloadStep2(url, dest, cb)
{

    executer("curl -o " + dest + " " + url);

/*

    For now disabled

    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response)
    {
        response.pipe(file);
        file.on('finish', function () {
            file.close();
            cb(url, dest);
        });
    });

*/

}

/*
 download export function
 url
 dest    target file name
 cb      call back
 */
exports.download = function (url, dest, cb)
{

    var badInput = false;

    if (S(dest).contains(".."))
    {
        badInput = true;
    }

    if (!badInput) {
        url = S(url).toLowerCase(url);
        db.isMemberMaliciousURL(url, dest, downloadStep2, cb);
    }
    else
    {
        console.log("Aborting download of " + url + " to location " + dest + " based on malicious user input");
    }
}

exports.downloadStep2 = downloadStep2;
exports.finishCallBack = finishCallBack;