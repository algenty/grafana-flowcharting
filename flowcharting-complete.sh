#!/usr/bin/env bash

${PWD}/docker-nodejs-cmd.sh npm run clean &&  \
${PWD}/docker-nodejs-cmd.sh npm run build &&  \
${PWD}/docker-nodejs-cmd.sh npm run sign && \
${PWD}/docker-nodejs-cmd.sh npm run archive
