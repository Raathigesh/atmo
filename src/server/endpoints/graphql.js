var apollo = require('apollo-server');
var util = require('../apiServer/util');

function graphqlModule(app, spec) {
	registerGraphqlEndpoints(app, spec.graphqlEndpoints)
}

var mocks = {
  String: function() {
    return "It works!"
  }
};

function registerGraphqlEndpoints(app, endpoints) {
  if(endpoints[0]) {
    util.removeRouteIfAvailable(app, endpoints[0]);
    app.use(endpoints[0].url, apollo.apolloServer({
      graphiql: true,
        pretty: true,
        schema: endpoints[0].schema,
        mocks: mocks
    }));
  }    
}

module.exports = graphqlModule;