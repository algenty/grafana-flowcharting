#!/usr/bin/env bash
# source : https://github.com/envygeeks/jekyll-docker/blob/master/README.md

[ -z ${FLOWCHARTING_DOCS_HOME+x} ] && echo "Variable WORKSPACE_HOME not set" && exit 1
[ -z ${FLOWCHARTING_DOCS_HOME+d} ] && echo "Directory ${FLOWCHARTING_DOCS_HOME} not exist or permission denied" && exit 1

_JEKYLL_VERSION="${JEKYLL_VERSION:-4.0}"

docker run --rm \
  -it --ipc=host\
  --dns 8.8.8.8 \
  --volume="${PWD}:/srv/jekyll:Z" \
  --volume="${PWD}/vendor:/usr/local/bundle:Z" \
  jekyll/jekyll:${_JEKYLL_VERSION} \
  jekyll build