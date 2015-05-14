var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require('path');
var ana = require("./analyzer");
var S = require('string');
var twitter = require("./twitter");
var moment = require("moment");
var config = "test";



var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};


/**
 * retrive the correct path for the stored html data
 * @param config
 * @param openShiftDataDir
 * @returns {string}
 */
function getHtmlPath(config, openShiftDataDir) {

    var openShiftDataDir = process.env.OPENSHIFT_DATA_DIR;


    var configuredHtmlPath = config.html;
    if (openShiftDataDir != undefined)
    {
        configuredHtmlPath = openShiftDataDir + '/html/';
    }
    else
    {
        configuredHtmlPath = config.html;
    }

    return configuredHtmlPath;
}


function start(configName) {

    config = require(configName);

    function onRequest(request, response) {


        /* set the correct content type */
        response.writeHead(200, {"Content-Type": "text/html"});

        var query = request.url;
        var ip = request.connection.remoteAddress;

        // get data directory for OpenShift (easy check, if we run in Openshift)
        var openShiftDataDir = process.env.OPENSHIFT_DATA_DIR;
        var logPath = "/var/log/nodepot.log";

        var configuredHtmlPath = getHtmlPath(config, openShiftDataDir);

        if (openShiftDataDir != undefined)
        {
            logPath = openShiftDataDir + "/log/nodepot.log"
        }


        // admin check (query and IP range)
        if ((query == "/admin" || query == "admin") && (S(ip).contains("127.0.0.1") || S(ip).contains(config.home_ip)))
        {
            // show UI

            var defaultTemplateStart = fs.readFileSync(configuredHtmlPath + '/adminstart.html', 'utf8');
            var learnedStuff = fs.readFileSync(logPath, 'utf8');
            var defaultTemplateEnd = fs.readFileSync(configuredHtmlPath + '/adminend.html', 'utf8');
            response.write(defaultTemplateStart);
            response.write(learnedStuff);
            response.write(defaultTemplateEnd);

        }
        else
        {  /* default analyze case */

            /* check if the request contains an .. code */
            statusAnalyze = ana.analyze(request, response, config);




            var defaultTemplate = fs.readFileSync(configuredHtmlPath + '/demo.html', 'utf8');
            var learnedStuff = fs.readFileSync(configuredHtmlPath + '/dork.html', 'utf8');

            response.write(defaultTemplate);
            response.write(learnedStuff);

            if (config.twitter.verbose == "yes" && statusAnalyze != null)
            {
                twitter.tweet(moment().format('MMMM Do YYYY, h:mm:ss a') + "(Nodepot): Found request from ip " + ip, config);
            }


        }
        response.end();
    }

    var openShiftIP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    var port = process.env.OPENSHIFT_NODEJS_PORT;

    if (port != undefined) {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + " Server tries to start on port " + port);
    }

    if (openShiftIP != undefined)
    {
        http.createServer(onRequest).listen(process.env.OPENSHIFT_NODEJS_PORT, openShiftIP);
    }
    else
    {
        http.createServer(onRequest).listen(config.port);
    }

    console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + " Server has started.");
}

exports.start = start;