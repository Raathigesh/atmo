import Block from "../../../renderer/store/Block";
import Component from "./component";
import Store from "./store/store";

const httpBaseBlock: Block = {
  name: "httpBaseBlock",
  component: Component,
  store: new Store()
};

export default httpBaseBlock;
