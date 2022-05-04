#!/usr/bin/env bash

_GRAFANA_VERSION=8.5.0
_DOCKER_IMAGE="grafana/grafana-oss:${_GRAFANA_VERSION}"
_USER_UID=$(id -u)
_USER_GID=$(id -g)

docker run \
  --publish 3000:3000 \
  --user ${_USER_UID}:${_USER_GID} \
  --volume "$(pwd)":/var/lib/grafana/plugins/agenty-flowcharting-panel:ro \
  --name=grafana-dev \
  ${_DOCKER_IMAGE}

echo "http://localhost:3000/"
