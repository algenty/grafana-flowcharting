#!/usr/bin/env bash
# source : https://github.com/envygeeks/jekyll-docker/blob/master/README.md

echo "$0 [port]"

export _JEKYLL_VERSION="${JEKYLL_VERSION:-4.0}"
export _JEKYLL_PORT=${1:-4000}

docker run --rm \
  -it --ipc=host\
  --dns 8.8.8.8 \
  --publish ${_JEKYLL_PORT}:${_JEKYLL_PORT} \
  --volume="${PWD}:/srv/jekyll:Z" \
  --volume="${PWD}/vendor:/usr/local/bundle:Z" \
  jekyll/jekyll:${_JEKYLL_VERSION} \
  jekyll serve --port ${_JEKYLL_PORT} --watch