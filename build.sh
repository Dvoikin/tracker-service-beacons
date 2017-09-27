#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
IMAGE="dvoykin/${COMPONENT}:${VERSION}-build"
CONTAINER="${COMPONENT}"

set -e
set -o pipefail

rm -rf ./obj

docker build -f Dockerfile.build -t ${IMAGE} .

# Create and copy compiled files, then destroy
docker create --name ${CONTAINER} ${IMAGE}
docker cp ${CONTAINER}:/app/obj ./obj
docker rm ${CONTAINER}