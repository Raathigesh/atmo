import { types, getParent } from "mobx-state-tree";

const Response = types.model("Response", {
  type: "json",
  responseContent: ""
});

export default Response;
