#!/bin/bash

#
# start redis db and the nodepot honeypot with a new given location for the configfile
#

/usr/bin/redis-server &
cd /opt/Nodepot
nodejs app.js $1

