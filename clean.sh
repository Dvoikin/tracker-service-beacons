#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')
BUILD_IMAGE="dvoykin/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}-build"
IMAGE1="dvoykin/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}"
IMAGE2="dvoykin/${COMPONENT}:latest"
TEST_IMAGE="dvoykin/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}-test"

rm -rf ./node_modules
rm -rf .obj

docker rmi $BUILD_IMAGE --force
docker rmi $IMAGE1 --force
docker rmi $IMAGE2 --force
docker rmi $TEST_IMAGE --force
docker image prune --force