import { types, getParent } from "mobx-state-tree";
import Header from "./Header";
import Response from "./Response";

const Endpoint = types.model("Endpoint", {
  id: types.identifier(),
  url: "",
  method: "get",
  headers: types.optional(types.array(Header), []),
  response: types.optional(Response, {}),
  responseCode: "200",
  delay: 0
});

export default Endpoint;
