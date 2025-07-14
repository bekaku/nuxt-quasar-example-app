#!/bin/bash
rm ./build/nuxt-quasar-web.tar
rm -rf ./build
mkdir build

docker rmi nuxt-quasar-web:latest

docker image build --no-cache -t nuxt-quasar-web:latest .

# docker save -o ./build/nuxt-quasar-web.tar nuxt-quasar-web:latest
docker-compose up -d
