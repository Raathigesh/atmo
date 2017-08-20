# Configure SSL

## Generate self-sign certificate

Execute the following in the terminal.

```shell
 openssl req -x509 -newkey rsa:2048 -keyout key.pem -out -nodes cert.pem -days 365
```

Use the `-nodes` arg to avoid express prompting for passphrase.

## Configure Atmo

1. Go to `Project Settings`
2. Click on `Advanced` tab
3. Browse the `cert.pem` file for `Certificate file`
4. Browse the `key.pem` file for `Key file`
5. Deploy your project for the changes to take effect
