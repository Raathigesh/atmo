# How to proxy a Url with Atmo
Atmo supports to proxy any url with ease.

![Widget Frame](./images/ProxyEndpoint.PNG)

The above example shows how http://stackoverflow.com/ is proxied through http://localhost/proxy.

All the proxied endpoints will be added with `Access-Control-Allow-Origin : *` response header which will make consuming API which doesn't have cross origin header easier.