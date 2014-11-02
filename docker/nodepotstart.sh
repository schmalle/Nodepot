#!/bin/bash

#
# start redis db and the nodepot honeypot
#

/usr/bin/redis-server &
cd /opt/Nodepot
nodejs app.js

