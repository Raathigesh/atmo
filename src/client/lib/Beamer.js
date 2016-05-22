import socket from 'socket.io-client';

export default class Beamer {
  constructor(url) {
    this.connection = socket(url);
    this.connection.on('connect', this.onConnection);
  }

  onConnection = () => {
  }

  deployChanges = (payload) => {
    this.connection.emit('deploy', payload);
  }
}
