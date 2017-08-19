# Custom script
This custom script has accept to the route's `request` and `response` object.

## Send response
```javascript
response.set('Content-Type', 'application/json');
response.send({
  message: 'Hello from atmo!'
});
```

## Access request parameters
Set the url as below
> /user/:id

Now if you pass the id in the url, you should be able to access them in the script.

> /user/1

```javascript
if (request.params.id === "1") {
  response.send({
    message: 'Parameter is 1'
  });
} else {
  response.send({
    message: 'Prameter is not 1'
  });
}
```

## Acess query string parameters

```javascript
response.send({
  message: request.query.message
});
```

And then send the query parameter via the url as follows.

> /user?message=hello
