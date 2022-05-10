#!/usr/bin/env bash

${PWD}/nodejs-cmd.sh npm cache clean -f
rm -rf node_modules package-lock.json
#${PWD}/flowcharting-init.sh
