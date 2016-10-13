#!/bin/bash
#
# Usage: docker build -t toolmanager . && ./develop.sh toolmanager
#

docker run -it --rm --name=toolmgr \
    -v `pwd`/api/:/usr/local/bin/ \
    -v `pwd`/data/:/usr/local/data/ \
    -v `pwd`/js:/usr/share/nginx/html/ \
    ${1:-ndslabs/toolmanager}
