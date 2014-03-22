var server = require("./server");

var runner = 0;
var configFileName ="/etc/nodepot.cfg"

process.argv.forEach(function (val, index, array)
{
    console.log(index + ': ' + val);

    if (runner == 2)
    {
        configFileName = val;
    }

    runner++;

});

server.start(8888, configFileName);


