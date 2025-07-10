#!/bin/bash

set -e

if [ $# -ne 4 ]; then
  echo "Usage: $0 <dockerfile> <image> <docker_hub_username> <docker_hub_password>"
  exit 1
fi

DOCKERFILE=$1
IMAGE=$2
DOCKER_HUB_USERNAME=$3
DOCKER_HUB_PASSWORD=$4

cd ..
docker build -t "$IMAGE" -f docker/"$DOCKERFILE" .
cd docker
echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin
docker push "$IMAGE"
