#!/usr/bin/env bash
# source : https://github.com/envygeeks/jekyll-docker/blob/master/README.md

[ -z ${FLOWCHARTING_DOCS_HOME+x} ] && echo "Variable WORKSPACE_HOME not set" && exit 1
[ -z ${FLOWCHARTING_DOCS_HOME+d} ] && echo "Directory ${FLOWCHARTING_DOCS_HOME} not exist or permission denied" && exit 1

_JEKYLL_VERSION="${JEKYLL_VERSION:-3.8}"

docker run --rm \
  -it \
  --ipc=host \
  --net=host \
  --volume="${PWD}:/srv/jekyll:Z" \
  --volume="${PWD}/vendor:/usr/local/bundle:Z" \
  jekyll/jekyll:${_JEKYLL_VERSION} \
  jekyll build
