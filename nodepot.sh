#!/bin/bash

cmdLine="ps -efa | grep nodejs | wc -l";
cmdLine="/opt/nodepot_git/corecheck.sh";

number=$(eval $cmdLine);

echo "Number: $number"

case $number in

2)  echo "All OK";
    ;;

1)  echo "NodePot not running"
    cd /opt/nodepot_git/Nodepot
    nodejs app.js >> /opt/nodepot.log &
    ;;
*)  echo "Unknown situation"
    ;;
esac
