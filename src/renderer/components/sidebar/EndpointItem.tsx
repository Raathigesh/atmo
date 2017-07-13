import * as React from "react";
import { Menu, MenuItem, Sidebar, Icon, Label } from "semantic-ui-react";

interface IUrl {
  label: string;
  link?: string;
}

const Url = ({ label, link }: IUrl) => {
  return (
    <Menu.Item as="a" name="search">
      <Label color="teal">GET</Label>
      <Icon name="circle thin" />
      {label}
    </Menu.Item>
  );
};

export default Url;
