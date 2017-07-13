import { types, getParent } from "mobx-state-tree";
import Endpoint from "./endpoint/Endpoint";
const shortid = require("shortid");

const AppStore = types.model(
  "AppStore",
  {
    endpoints: types.optional(types.array(Endpoint), [])
  },
  {
    addEndpoint(url: string) {
      this.endpoints.push({
        id: shortid.generate(),
        url
      });
    }
  }
);

export type IAppStore = typeof AppStore.Type;
export default AppStore;
