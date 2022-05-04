#!/usr/bin/env bash

_NODEJS_VERSION=14.19.1
_DOCKER_IMAGE="node:${_NODEJS_VERSION}"
_DOCKER_CMD="$*"
_USER_UID=$(id -u)
_USER_GID=$(id -g)

docker run --rm \
  -it \
  --user ${_USER_UID}:${_USER_GID} \
  --ipc=host \
  --net=host \
  --env-file .flowcharting_env \
  --volume="${PWD}":/usr/src/app \
  --workdir /usr/src/app \
  ${_DOCKER_IMAGE} \
  /bin/sh -c "${_DOCKER_CMD}"
