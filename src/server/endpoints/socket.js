function socketModule(io, spec) {
  initializeSocketEndpoints(io, spec.socketEndpoints)
}

function initializeSocketEndpoints(io, endpoints) {
  io.on('connection', function (socket) {
    socket.removeAllListeners();
    for (var i = 0; i < endpoints.length; i++) {
      registerEvent(endpoints[i], socket, io);
    }
  });
}

function registerEvent(endpoint, socket, io) {
  socket.on(endpoint.eventName, function (data) {
    if (endpoint.emitType === 'all') {
      socket.emit(endpoint.eventToEmit, endpoint.payload);
    } else {
      io.to(socket.id).emit(endpoint.eventToEmit, endpoint.payload);
    }
  });
}

module.exports = socketModule