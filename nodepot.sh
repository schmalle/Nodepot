#!/bin/bash

cmdLine="ps -efa | grep nodejs | wc -l";
cmdLine="/opt/Nodepot/corecheck.sh";

number=$(eval $cmdLine);

echo "Number: $number"

case $number in

2)  echo "All OK";
    ;;

1)  echo "NodePot not running"
    cd /opt/Nodepot
    nodejs app.js >> /var/log/nodepot.log &
    ;;
*)  echo "Unknown situation"
    ;;
esac
