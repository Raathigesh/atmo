import { observable } from "mobx";
import Block from "./Block";

export default class Endpoint {
  @observable public blocks: Block[] = [];

  public addBlock(block: Block) {
    this.blocks.push(block);
  }
}
