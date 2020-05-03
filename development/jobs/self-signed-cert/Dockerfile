FROM rnix/openssl-gost

WORKDIR /self-signed-certs

CMD rm -rf /self-signed-certs/* && cp -ar /self-signed-certs-latest/. /self-signed-certs && ls -l /self-signed-certs
