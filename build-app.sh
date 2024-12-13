#!/bin/bash
rm ./build/nuxt3-quasar-webapp.tar
rm -rf ./build
mkdir build

docker rmi nuxt3-quasar-webapp:latest

docker image build --no-cache -t nuxt3-quasar-webapp:latest .

# docker save -o ./build/nuxt3-quasar-webapp.tar nuxt3-quasar-webapp:latest
docker-compose up -d
