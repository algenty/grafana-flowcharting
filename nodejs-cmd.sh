#!/usr/bin/env bash
[[ -f ${PWD}/.flowcharting_env ]] && source ${PWD}/.flowcharting_env
[ -z ${NODEJS_MODE+x} ] && NODEJS_MODE=local
echo "NODEJS_MODE=${NODEJS_MODE}"

_NODEJS_VERSION=14-slim
_DOCKER_IMAGE="node:${_NODEJS_VERSION}"
_NODEJS_CMD="$@"
_USER_UID=$(id -u)
_USER_GID=$(id -g)

build_env() {
  _TMP_FILE=$(mktemp)
  envsubst <.flowcharting_env >${_TMP_FILE}
  echo ${_TMP_FILE}
}

if [ "${NODEJS_MODE}" == "docker" ]; then
  echo "Running docker ..."
  _TMP_ENV_FILE=$(build_env)
  docker run --rm \
    -it \
    --user ${_USER_UID}:${_USER_GID} \
    --ipc=host \
    --net=host \
    --env-file ${_TMP_ENV_FILE} \
    --volume="${PWD}":/usr/src/app \
    --workdir /usr/src/app \
    ${_DOCKER_IMAGE} \
    /bin/sh -c "${_NODEJS_CMD}"
    _RETURN_CODE=$?
    rm ${_TMP_ENV_FILE}
    exit ${_RETURN_CODE}
else
  ${_NODEJS_CMD}
fi
