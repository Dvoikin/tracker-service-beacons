#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE1="dvoykin/${COMPONENT}:${VERSION}"
IMAGE2="dvoykin/${COMPONENT}:latest"
TAG="v${VERSION}-${BUILD_NUMBER-0}"

set -e
set -o pipefail

#git tag $TAG
#git push #--tags

export DOCKER_USER=dvoykin
export DOCKER_PASS=ah0908bh

docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push $IMAGE1
docker push $IMAGE2