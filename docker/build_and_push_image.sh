#!/bin/bash

set -e

if [ $# -ne 3 ]; then
  echo "Usage: $0 <image_name> <docker_username> <docker_password>"
  exit 1
fi

IMAGE_NAME=$1
DOCKER_USERNAME=$2
DOCKER_PASSWORD=$3

cd ..
docker build -t "$IMAGE_NAME" -f docker/dockerfile .
cd docker
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push "$IMAGE_NAME"
