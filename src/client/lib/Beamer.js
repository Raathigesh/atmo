import socket from 'socket.io-client';

export default class Beamer {
  constructor(url) {
    this.connection = socket(url);
   
  }
  
  onStart(callback) {
     this.connection.on('onStart', callback);
  }

  deployChanges = (payload) => {
    this.connection.emit('deploy', payload);
  }
  
  
  onDeploymentCompletion(callback) {
     this.connection.on('deploymentComplete', callback);
  }
}
