FROM ncsa/toolserver:1.0

COPY ./toolconfig.json /usr/local/data
COPY ./templates /usr/local/data/templates
COPY ./toolserver /usr/local/bin
COPY ./clowder-xfer /usr/local/bin
COPY ./entrypoint.sh /entrypoint.sh

RUN apt-get update -y && apt-get install curl nginx vim wget -y

ENV DOCKER_BUCKET get.docker.com
ENV DOCKER_VERSION 1.10.3
ENV DIND_COMMIT 3b5fac462d21ca164b3778647420016315289034

RUN set -x \
    && curl -fSL "https://${DOCKER_BUCKET}/builds/Linux/x86_64/docker-${DOCKER_VERSION}.tgz" -o docker.tgz \
    && tar -xzvf docker.tgz \
    && rm docker.tgz \
    && docker -v \
    && wget "https://raw.githubusercontent.com/docker/docker/${DIND_COMMIT}/hack/dind" -O /usr/local/bin/dind \
    && chmod +x /usr/local/bin/dind \
    && pip install jinja2 
     

ENV TOOLSERVER_PORT 8083

EXPOSE 8082
ENTRYPOINT ["/entrypoint.sh"]
CMD ["toolserver"]
