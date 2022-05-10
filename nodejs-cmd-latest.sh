#!/usr/bin/env bash
[[ -f ${PWD}/.flowcharting_env ]] && source ${PWD}/.flowcharting_env
[ -z ${NODEJS_MODE+x} ] && NODEJS_MODE=local
echo "NODEJS_MODE=${NODEJS_MODE}"

_NODEJS_VERSION=latest
_DOCKER_IMAGE="node:${_NODEJS_VERSION}"
_NODEJS_CMD="$@"
_USER_UID=$(id -u)
_USER_GID=$(id -g)

if [ "${NODEJS_MODE}" == "docker" ]; then
  echo "Running docker ..."
  docker pull ${_DOCKER_IMAGE}
  docker run --rm \
    -it \
    --user ${_USER_UID}:${_USER_GID} \
    --ipc=host \
    --net=host \
    --dns=8.8.8.8 \
    --env-file .flowcharting_env \
    --volume="${PWD}":/usr/src/app \
    --workdir /usr/src/app \
    ${_DOCKER_IMAGE} \
    /bin/sh -c "${_NODEJS_CMD}"
else
  ${_NODEJS_CMD}
fi
