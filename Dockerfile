FROM ncsa/toolserver:1.0

# Managed Data Tools
COPY toolconfig.json /usr/local/data
COPY templates /usr/local/data/templates

# ToolManager API
COPY toolserver clowder-xfer /usr/local/bin/
COPY entrypoint.sh /entrypoint.sh

# Install nginx / Node.js / npm
RUN apt-get -qq update && \
    apt-get -qq install \
      curl \
      nginx \
      vim \
      sudo \
      npm \
      wget && \
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get -qq install nodejs && \
    ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
    apt-get -qq autoremove && \
    apt-get -qq autoclean && \
    apt-get -qq clean all && \
    rm -rf /var/cache/apk/* /tmp/*
    
# Install npm / bower dependencies + ToolMaanger UI
ENV HTML_DIR /usr/share/nginx/html/
COPY package.json bower.json app index.html ${HTML_DIR}
RUN cd ${HTML_DIR} && \
    npm install -g bower && \
    npm install && \
    bower install --config.interactive=false --allow-root && \
    rm -rf /tmp/*

# Set up Docker-in-Docker parameters
ENV DOCKER_BUCKET get.docker.com
ENV DOCKER_VERSION 1.10.3
ENV DIND_COMMIT 3b5fac462d21ca164b3778647420016315289034

# Install Docker-in-Docker
RUN set -x \
    curl -fSL "https://${DOCKER_BUCKET}/builds/Linux/x86_64/docker-${DOCKER_VERSION}.tgz" -o docker.tgz \
    tar -xzvf docker.tgz \
    rm docker.tgz \
    docker -v \
    wget "https://raw.githubusercontent.com/docker/docker/${DIND_COMMIT}/hack/dind" -O /usr/local/bin/dind \
    chmod +x /usr/local/bin/dind \
    pip install jinja2 && \
    rm -rf /tmp/*
     
ENV TOOLSERVER_PORT 8083
EXPOSE 8082
ENTRYPOINT ["/entrypoint.sh"]
CMD ["toolserver"]