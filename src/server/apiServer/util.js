var removeRoute = require('express-remove-route');

/**
 * Removes the route from the API server is already registered.
 */
function removeRouteIfAvailable(app, endpoint) {
   if(removeRoute.findRoute(app, endpoint.url)) {
       removeRoute(app, endpoint.url);  
    }
}

module.exports = {
	removeRouteIfAvailable: removeRouteIfAvailable
}