var apollo = require('apollo-server');

function graphqlModule(app, spec) {
  registerGraphqlEndpoints(app, spec.graphqlEndpoints)
}

var mocks = {
  String: function () {
    return "It works!"
  }
};

function registerGraphqlEndpoints(app, endpoints) {
  for (var i = 0; i < endpoints.length; i++) {
    var endpoint = endpoints[i];
    app.use(endpoint.url, apollo.apolloServer({
      graphiql: true,
      pretty: true,
      schema: endpoint.schema,
      mocks: mocks
    }));
  }
}

module.exports = graphqlModule;