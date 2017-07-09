import * as React from "react";
import { Icon, Menu, MenuItem, Header } from "semantic-ui-react";
import Section from "../section";

const Response = () => {
  return (
    <Menu fluid widths={4}>
      <Menu.Item name="gamepad" active>
        <Icon name="quote left" />
        Json
      </Menu.Item>

      <Menu.Item name="video camera">
        <Icon name="file code outline" />
        Xml
      </Menu.Item>

      <Menu.Item name="video play">
        <Icon name="file text outline" />
        Text
      </Menu.Item>

      <Menu.Item name="video play">
        <Icon name="code" />
        Custom
      </Menu.Item>
    </Menu>
  );
};

export default Response;
