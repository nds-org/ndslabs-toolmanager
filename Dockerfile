FROM ncsa/toolserver:1.0

RUN apt-get update -y && apt-get install curl wget -y

ENV DOCKER_BUCKET get.docker.com
ENV DOCKER_VERSION 1.10.3

RUN set -x \
    && curl -fSL "https://${DOCKER_BUCKET}/builds/Linux/x86_64/docker-${DOCKER_VERSION}.tgz" -o docker.tgz \
    && tar -xzvf docker.tgz \
    && rm docker.tgz \
    && docker -v

ENV DIND_COMMIT 3b5fac462d21ca164b3778647420016315289034

RUN wget "https://raw.githubusercontent.com/docker/docker/${DIND_COMMIT}/hack/dind" -O /usr/local/bin/dind \
    && chmod +x /usr/local/bin/dind


COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["toolserver"]
