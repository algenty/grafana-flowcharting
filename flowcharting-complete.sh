#!/usr/bin/env bash

${PWD}/nodejs-cmd.sh npm run clean &&  \
${PWD}/nodejs-cmd.sh npm run build &&  \
${PWD}/nodejs-cmd.sh npm run sign && \
${PWD}/nodejs-cmd.sh npm run archive
