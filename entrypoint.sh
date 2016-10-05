#!/bin/bash
set -e

if [ "$1" = "toolserver" ]; then

   $(which dind) docker daemon \
        --host=unix:///var/run/docker.sock \
        --host=tcp://0.0.0.0:2375 \
#        --registry-mirror=http://docker-cache.default:5001 \
        --storage-driver=vfs  > dind.log 2>&1 &

   toolserver

else
   exec "$@"
fi
