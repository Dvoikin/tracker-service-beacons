#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE="dvoykin/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}-test"
CONTAINER="${COMPONENT}"

set -e
set -o pipefail

docker-compose -f ./docker-compose.test.yml down

export IMAGE
docker-compose -f ./docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test

docker-compose -f ./docker-compose.test.yml down
