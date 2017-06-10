import mobx from 'mobx';
import Endpoint from '../models/http/Endpoint';
import Response from '../models/http/Response';
import Header from '../models/http/Header';
import ContentType from '../models/http/ContentType';
import contentTypes from '../models/http/ContentTypes';
import SocketEndpoint from '../models/socket/SocketEndpoint';
import GraphqlEndpoint from '../models/graphql/GraphqlEndpoint';
import JsonServerEndpoint from '../models/jsonServer/JsonServerEndpoint';
import ProxyEndpoint from '../models/proxy/ProxyEndpoint';

/**
 * Parses the spec to endpoints
 */
export function parseSpec(spec) {
  var endpoints = [];
  if (!spec.endpoints && !spec.socketEndpoints && !spec.graphqlEndpoints && !spec.jsonServerEndpoint) {
    // if the spec doesn't have endpoint, initialize with a default http endpoint
    endpoints.push(new Endpoint('/', 'GET', [new Header('Access-Control-Allow-Origin', '*')], new Response(contentTypes[0], '{}')));
  } else {
    for (let endpoint of spec.endpoints) {
      let response = new Response(new ContentType(endpoint.response.contentType.type, endpoint.response.contentType.contentType), endpoint.response.content, endpoint.response.responseCode);
      endpoints.push(new Endpoint(endpoint.url, endpoint.method, getHeadersFromJson(endpoint), response));
    }

    for (let endpoint of spec.socketEndpoints) {
      endpoints.push(new SocketEndpoint(endpoint.eventName, endpoint.eventToEmit, endpoint.payload, endpoint.emitType));
    }

    for (let endpoint of spec.graphqlEndpoints) {
      endpoints.push(new GraphqlEndpoint(endpoint.url, endpoint.schema));
    }

    for (let endpoint of spec.proxyEndpoints) {
      endpoints.push(new ProxyEndpoint(endpoint.url, endpoint.urlToProxy));
    }

    if (spec.jsonServerEndpoint) {
      endpoints.push(new JsonServerEndpoint(spec.jsonServerEndpoint.url, spec.jsonServerEndpoint.model));
    }
  }
  return endpoints;
}

/**
 * Returns a plain object tranforming the endpoints
 */
export function getPayload(endpoints) {
  let httpEndpoints = [];
  let socketEndpoints = [];
  let graphqlEndpoints = [];
  let proxyEndpoints = [];
  let jsonServerEndpoint = null;

  for (let endpoint of endpoints) {
    if (endpoint.type === 'http') {
      httpEndpoints.push(endpoint);
    } else if (endpoint.type === 'socket') {
      socketEndpoints.push(endpoint);
    } else if (endpoint.type === 'gql') {
      graphqlEndpoints.push(endpoint);
    } else if (endpoint.type === 'jsonServer') {
      jsonServerEndpoint = endpoint;
    } else if (endpoint.type === 'proxy') {
      proxyEndpoints.push(endpoint);
    }
  }

  let payload = {
    endpoints: mobx.toJSON(httpEndpoints),
    socketEndpoints: mobx.toJSON(socketEndpoints),
    graphqlEndpoints: mobx.toJSON(graphqlEndpoints),
    jsonServerEndpoint: jsonServerEndpoint,
    proxyEndpoints: mobx.toJSON(proxyEndpoints)
  };

  return payload;
}

/**
 * Retrurns true if a json-server endpoint already exists; Else false.
 */
export function isAnyJsonServerEndpointAvailable(endpoints) {
  for (let endpoint of endpoints) {
    if (endpoint.type === 'jsonServer') {
      return true;
    }
  }
  return false;
}

/**
 * Returns an array of headers for a http request
 */
function getHeadersFromJson(endpoint) {
  let headers = [];
  for (let header of endpoint.headers) {
    headers.push(new Header(header.key, header.value));
  }
  return headers;
}