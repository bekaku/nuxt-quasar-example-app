$ErrorActionPreference = "Stop"

$IMAGE_NAME = "nuxt-quasar-web"
$TAG = "latest"
$BUILD_DIR = "./build"

if (Test-Path $BUILD_DIR) {
    Remove-Item -Path $BUILD_DIR -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $BUILD_DIR | Out-Null

docker image inspect "$IMAGE_NAME:$TAG" *> $null
if ($LASTEXITCODE -eq 0) {
    docker rmi "$IMAGE_NAME:$TAG"
}

docker image build --no-cache -t "$IMAGE_NAME:$TAG" .

docker compose version *> $null
if ($LASTEXITCODE -eq 0) {
    docker compose up -d
} else {
    docker-compose up -d
}