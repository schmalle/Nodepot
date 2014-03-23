var dl = require("./../downloader");

dl.download("http://cdn.arwrath.com/1/121981.jpg", "/opt/downloads/1.jgp", finishcall);

function finishcall()
{
    console.log("finished");
}


