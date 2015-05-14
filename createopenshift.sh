#!/usr/bin/env bash

echo "Starting creation of a new Nodepot app named $1"

rhc app create $1 nodejs-0.10 --from-code=http://github.com/schmalle/nodepot.git
rhc add-cartridge http://cartreflect-claytondev.rhcloud.com/reflect?github=smarterclayton/openshift-redis-cart --app $1

echo "Finished..."




