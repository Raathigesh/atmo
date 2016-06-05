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
  
  saveChanges = (spec) => {
    this.connection.emit('save', spec);
  }
  
  
  onDeploymentCompletion(callback) {
     this.connection.on('deploymentComplete', callback);
  }
}
