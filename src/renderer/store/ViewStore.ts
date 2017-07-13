import { types, getParent } from "mobx-state-tree";

const ViewStore = types.model("ViewStore", {
  isProjectPreferenceOpen: false
});

export default ViewStore;
