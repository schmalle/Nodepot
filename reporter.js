var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function report(username, password, host, ip, time, attacktyoe) {

    var reportTemplate = fs.readFileSync('./template/report.txt','utf8');

    var stage1 = S(reportTemplate).replaceAll('USERNAME', username).s
    var stage2 = S(stage1).replaceAll('PASSWORD', password).s
    var stage3 = S(stage2).replaceAll('HOST', host).s
    var stage4 = S(stage3).replaceAll('IP', ip).s
    var stage5 = S(stage4).replaceAll('TIME', time).s
    var stage6 = S(stage5).replaceAll('ATTACKTYPE', attacktype).s

    PostCode(stage6);

}


/** code taken from http://stackoverflow.com/questions/6158933/how-to-make-an-http-post-request-in-node-js **/


function PostCode(codestring) {


    // An object of options to indicate where to post to
    var post_options = {
        host: 'https://www.t-sec-radar.de',
        port: '443',
        path: '/ews-0.1/alert/postSimpleMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': codestring.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(codestring);
    post_req.end();

}



exports.report = report;