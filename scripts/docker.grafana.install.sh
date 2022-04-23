#!/bin/bash
HOME_PLUGINS=/home/dosy07/dev/workspace
# HOME_CONFIG=$PWD/grafana/config
[ ! -d "$HOME_PLUGINS" ] && echo "HOME_PLUGINS=${HOME_PLUGINS} doesn't exist" && exit 1
# [ ! -d "$HOME_CONFIG" ] && echo "HOME_CONFIG=${HOME_CONFIG} doesn't exist" && exit 1
docker volume create grafana-storage
docker volume create grafana-config
docker run -d -p 3000:3000 --name=grafana --restart=always -e GF_DEFAULT_APP_MODE=development \
    -v ${HOME_PLUGINS}:/var/lib/grafana/plugins \
    -v grafana-storage:/var/lib/grafana \
    -v grafana-config:/etc/grafana \
    grafana/grafana-oss
echo "http://localhost:3000"