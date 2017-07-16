import * as React from "react";
import { Menu, Icon } from "semantic-ui-react";

interface IResponse {
  activeItem?: string;
  setActiveItem: (value: string) => void;
}

interface State {
  activeItem?: string;
}

export default class MenuExampleBasic extends React.Component<
  IResponse,
  State
> {
  handleItemClick = (e, { name }) => this.props.setActiveItem(name);

  render() {
    const { activeItem } = this.props;

    return (
      <Menu>
        <Menu.Item
          name="json"
          active={activeItem === "json"}
          onClick={this.handleItemClick}
        >
          <Icon name="quote left" />
          Json
        </Menu.Item>

        <Menu.Item
          name="xml"
          active={activeItem === "xml"}
          onClick={this.handleItemClick}
        >
          <Icon name="file code outline" />
          Xml
        </Menu.Item>

        <Menu.Item
          name="text"
          active={activeItem === "text"}
          onClick={this.handleItemClick}
        >
          <Icon name="file text outline" />
          Text
        </Menu.Item>

        <Menu.Item
          name="custom"
          active={activeItem === "custom"}
          onClick={this.handleItemClick}
        >
          <Icon name="code" />
          Custom
        </Menu.Item>
      </Menu>
    );
  }
}
