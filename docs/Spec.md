# Spec Schema

```javascript
{
	// Http endpoints
    "endpoints": [{
		// Url of the http endpoint
        "url": "/",
		// Http method of the http endpoint
        "method": "GET",
		// Headers of the http endpoint
        "headers": [{
			// Header key
            "key": "Access-Control-Allow-Origin",
			// Header value
            "value": "*"
        }],
		// Response of the endpoint
        "response": {
			// Response content
            "content": "{}",
			// Cotent type of the http endpoint
            "contentType": {
				// Type of the response
                "type": "JSON",
				// Content type value
                "contentType": "application/json"
            },
			// Response code
            "responseCode": "200"
        },
		// Type of the endpoint
        "type": "http"
    }],
	// Socket endpoints
    "socketEndpoints": [{
		// Name of the socket event
        "eventName": "tweet",
		// Name of the event that should be emitted back
        "eventToEmit": "tweet",
		// Payload of the event that should be emitted back
        "payload": "{}",
		// one of 3 following emit types 
		// 'all' - Emit to all the connected clients
		// 'self' - Emit to only the current client who send the message
		// 'broadcast' - Emit to all the connected clients but not the current one
        "emitType": "broadcast",
		// Type of this endpoint
        "type": "socket"
    }],
	// Graphql endpoints
    "graphqlEndpoints": [{
		// Url of the graphql endpoint
        "url": "/graphql",
		// Graphql scema for this endpoint as string
        "schema": ""
    }],
	// Json-server endpoint
    "jsonServerEndpoint": {
		// Url where the json-server should be mounted
        "url": "/api",
		// Model or db object of json-sever. Mode detail on json-server github repo.
        "model": "{}",
		// Typpe of this endpoint
        "type": "jsonServer"
    },
	// Proxy endpoint
    "proxyEndpoints": [{
		// Url of the proxy endpoint
        "url": "/proxy",
		// Url that should be proxied
        "urlToProxy": "https://github.com/Raathigesh/Atmo",
		// Type of this endpoint
        "type": "proxy"
    }]
}
```
