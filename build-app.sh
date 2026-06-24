#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="nuxt-quasar-web"
TAG="latest"
BUILD_DIR="./build"

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

if docker image inspect "$IMAGE_NAME:$TAG" >/dev/null 2>&1; then
  docker rmi "$IMAGE_NAME:$TAG"
fi

docker image build --no-cache -t "$IMAGE_NAME:$TAG" .

# Save Docker image to a tar file
docker save -o ".\${BUILD_DIR}\${IMAGE_NAME}.tar" "${IMAGE_NAME}:${TAG}"

# Prune Docker builder cache
docker builder prune -f


if docker compose version >/dev/null 2>&1; then
  docker compose up -d
else
  docker-compose up -d
fi
