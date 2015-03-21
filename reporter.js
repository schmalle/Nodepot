var querystring = require('querystring');
var urlencode = require('urlencode');
var https = require('https');
var fs = require('fs');
var S = require('string');
var util = require("sys");
var request = require("request");
//var config = require("/etc/nodepot/config");
var moment = require("moment");
var querystring = require("querystring");


function report(username, password, host, ip, time, attacktype, mode, alarmHost, alarmURL, alarmPort, rawData, config) {

    var reportTemplate = fs.readFileSync('./template/report.txt','utf8');

    var stage1 = S(reportTemplate).replaceAll('xxx', username).s
    var stage2 = S(stage1).replaceAll('yyy', password).s
    var stage3 = S(stage2).replaceAll('HOST', host).s
    var stage4 = S(stage3).replaceAll('ATTACKER_IP', ip).s
    var stage5 = S(stage4).replaceAll('TIME', time).s
    var stage6 = S(stage5).replaceAll('ATTACKTYPE', urlencode(attacktype)).s
    var stage7 = S(stage6).replaceAll('MY_IP', config.my_ip).s
    var stage8 = S(stage6).replaceAll('RDATA', rawData).s

    PostCode(stage8, mode, alarmHost, alarmURL, alarmPort, config);

}


/** partly code taken from http://stackoverflow.com/questions/6158933/how-to-make-an-http-post-request-in-node-js **/

/*
    POST the data to the server or to the console, depending on the mode parameter (test)
 */
function PostCode(codestring, mode, alarmHost, alarmURL, alarmPort, config) {


    var useews = config.ews.use;

    // check, if ews useage is defined, if not, skip and log
    if ( typeof useews !== 'undefined' && useews == "yes")
    {

        var query = "https://" + config.ews.host + ":" + config.ews.port + config.ews.path;

        //console.log("Body Input" + codestring);
        //console.log("Request URL:" + query);

        request.post({
            headers: {'content-type' : 'text/xml'},
            url:     query,
            body:    codestring
        }, function(error, response, body){
            console.log("body: " + body);
            console.log("statuscode: " + response.statusCode);
        });


    }
    else
    {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": No DTAG / EWS reporting activated / configured");
    }



}



exports.report = report;