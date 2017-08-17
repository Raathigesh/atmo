import { observable, action, computed, IObservableArray } from "mobx";
import { bind } from "decko";
import Endpoint from "./endpoint/Endpoint";
import projectStore from "./ProjectStore";

export default class AppStore {
  @observable endpoints: IObservableArray<Endpoint> = observable([]);
  @observable currentEndpoint: Endpoint;

  constructor() {
    const initialEndpoint = this.addEndpoint("/");
    initialEndpoint.headers.setJsonContentType();
  }

  @bind
  @action
  setCurrentEndpoint(id: string) {
    this.currentEndpoint = this.endpoints.find(endpoint => endpoint.id === id);
  }

  @bind
  @action
  addEndpoint(url: string = "") {
    const endpoint = new Endpoint();
    endpoint.setUrl(url);

    this.currentEndpoint = endpoint;
    this.endpoints.push(endpoint);
    return endpoint;
  }

  @bind
  @action
  deleteEndpoint(id: string) {
    this.setCurrentEndpoint(this.endpoints[0].id);
    this.endpoints.remove(this.endpoints.find(endpoint => endpoint.id === id));
  }

  @bind
  @action
  moveEndpoint(fromIndex: number, toIndex: number) {
    this.endpoints.move(fromIndex, toIndex);
  }

  @action.bound
  reset() {
    this.endpoints.clear();
  }

  @action.bound
  initializeFromObject(endpoints) {
    this.reset();

    for (let ep of endpoints) {
      const endpoint = new Endpoint();
      endpoint.setMethod(ep.method);
      endpoint.setDelay(ep.delay);
      endpoint.setResponseCode(ep.statusCode);
      endpoint.setUrl(ep.url);
      endpoint.response.setType(ep.response.contentType);
      endpoint.response.setResponseContent(ep.response.content);

      for (let header of ep.headers) {
        endpoint.headers.addHeader(header.key, header.value);
      }

      this.endpoints.push(endpoint);
    }

    if (this.endpoints.length > 0) {
      this.setCurrentEndpoint(this.endpoints[0].id);
    }
  }

  toJson() {
    const spec = {
      name: projectStore.name,
      endpoints: this.endpoints.map(endpoint => endpoint.toJson()),
      server: {
        port: projectStore.preference.port,
        staticFolder: projectStore.preference.assetsDirectory,
        certificatePath: projectStore.preference.certificatePath,
        keyPath: projectStore.preference.keyPath
      },
      preference: projectStore.preference.toJson()
    };
    console.log(spec);
    return spec;
  }
}

export const appStore = new AppStore();
