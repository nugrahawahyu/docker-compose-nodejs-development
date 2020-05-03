openssl req -x509 -out certs/server.crt -keyout certs/server.key -days 1024 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=iredium-dev.host' \
  -config server.conf
