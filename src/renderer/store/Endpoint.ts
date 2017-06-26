import { observable } from "mobx";

export default class Endpoint {
  @observable private blocks: { [key: string]: any } = {};

  public addBlock(name: string, blockInstance: any) {
    if (this.blocks[name]) {
      throw new Error("Block with the name already exists");
    }

    this.blocks[name] = blockInstance;
  }

  public removeBlock(name: string) {
    if (!this.blocks[name]) {
      throw new Error("Block with the name does not exist");
    }

    delete this.blocks[name];
  }
}
