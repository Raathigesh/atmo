import { types, getParent } from "mobx-state-tree";

const Header = types.model("Header", {
  key: types.string,
  value: types.string
});

export default Header;
