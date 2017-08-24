import { observable, action, computed, IObservableArray } from "mobx";
import Endpoint from "./endpoint/Endpoint";
import projectStore from "./ProjectStore";

export default class AppStore {
  @observable endpoints: IObservableArray<Endpoint> = observable([]);
  @observable currentEndpoint: Endpoint;

  constructor() {
    const initialEndpoint = this.addEndpoint("/");
    initialEndpoint.headers.setJsonContentType();
  }

  @action.bound
  setCurrentEndpoint(id: string) {
    this.currentEndpoint = this.endpoints.find(endpoint => endpoint.id === id);
  }

  @action.bound
  addEndpoint(url: string = "") {
    const endpoint = new Endpoint();
    endpoint.setUrl(url);
    endpoint.headers.setJsonContentType();

    this.currentEndpoint = endpoint;
    this.endpoints.push(endpoint);
    return endpoint;
  }

  @action.bound
  deleteEndpoint(id: string) {
    this.setCurrentEndpoint(this.endpoints[0].id);
    this.endpoints.remove(this.endpoints.find(endpoint => endpoint.id === id));
  }

  @action.bound
  moveEndpoint(fromIndex: number, toIndex: number) {
    this.endpoints.move(fromIndex, toIndex);
  }

  @action.bound
  reset() {
    this.endpoints.clear();
  }

  /**
   * Re-initializes the store from the saved
   * project file
   */
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
      endpoint.response.setResponseContent(ep.response.rawContent);

      for (let header of ep.headers) {
        endpoint.headers.addHeader(header.key, header.value);
      }

      this.endpoints.push(endpoint);
    }

    // set the first endpoint as the selected one
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
