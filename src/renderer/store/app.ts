import { observable } from "mobx";
import Composition from "./Composition";

class App {
  @observable private endpoints: Composition[] = [];
}

export default new App();
