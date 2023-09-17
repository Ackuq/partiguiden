# Dev HTTPS Proxy

Generate self-signed certificate for using the https proxy when running on localhost:

```bash
mkdir .cert
openssl req -x509 -out .cert/localhost.crt -keyout .cert/localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
