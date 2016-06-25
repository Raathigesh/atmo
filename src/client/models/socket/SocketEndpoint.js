import { observable, computed } from 'mobx';

export default class SocketEndpoint {
  @observable eventName;
  @observable eventToEmit;
  @observable payload;
  @observable emitType;
  type;

  constructor(eventName, eventToEmit, payload, emitType) {
    this.eventName = eventName;
    this.eventToEmit = eventToEmit;
    this.payload = payload;
    this.emitType = emitType;
    this.type = 'socket';
  }

  setEventName(name) {
    this.eventName = name;
  }

  setEventToEmit(name) {
    this.eventToEmit = name;
  }

  setPayload(payload) {
    this.payload = payload;
  }

  setEmitType(value) {
    this.emitType = value;
  }

  @computed get displayEndpoint() {
    return '';
  }
}
