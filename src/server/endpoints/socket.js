function socketModule(io, spec) {
	initializeSocketEndpoints(io, spec.socketEndpoints)
}

function initializeSocketEndpoints(io, endpoints) {
  io.on('connection', function(socket) {
	socket.removeAllListeners();
    for(var i = 0; i < endpoints.length; i++) {
      registerEvent(endpoints[i], socket);
    }
  });
}

function registerEvent(endpoint, socket) {  
  socket.on(endpoint.eventName, function(data) {
    console.log(data);
    socket.emit(endpoint.eventToEmit, endpoint.payload);
  });
}

module.exports = socketModule