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

  generateProject = (spec) => {
    this.connection.emit('generate', spec);
  }

  installGenerator= (name) => {
    this.connection.emit('installGenerator', name);
  }

  syncJsonServer = () => {
    this.connection.emit('syncJsonServerDb');
  }
  
  
  onDeploymentCompletion(callback) {
     this.connection.on('deploymentComplete', callback);
  }

  onNewGeneratorInstallation(callback) {
    this.connection.on('generatorInstalled', callback);
  }

  onMessage(callback) {
    this.connection.on('message', callback);
  }

  onJsonServerDbUpdate(callback) {
    this.connection.on('jsonDb', callback);
  }
}
