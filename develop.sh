#!/bin/bash
#
# Grabs bower dependencies, then starts a container with the source mapped-in.
#
# Usage: docker build -t toolmanager . && ./develop.sh toolmanager
#

docker run -it --rm -w /data \
    -v `pwd`/js:/data \
    bodom0015/nodejs-bower-grunt \
    bower install

docker run -it -d --name=toolmgr \
    -p 8082-8083:8082-8083 \
    -v `pwd`/api/:/usr/local/bin/ \
    -v `pwd`/data/:/usr/local/data/ \
    -v `pwd`/js:/usr/share/nginx/html/ \
    ${@:-ndslabs/toolmanager}
