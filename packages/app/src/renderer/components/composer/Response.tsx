import * as React from "react";
import { Menu, Icon, Modal, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react";

interface IResponse {
  activeItem?: string;
  setActiveItem: (value: string) => void;
}

interface State {
  isConfirmOpen?: boolean;
  clickedItem?: string;
}

@observer
export default class MenuExampleBasic extends React.Component<
  IResponse,
  State
> {
  state = {
    isConfirmOpen: false,
    clickedItem: ""
  };

  handleItemClick = (e, { name }) => {
    this.setState({
      isConfirmOpen: true,
      clickedItem: name
    });
  };

  onConfirm = () => {
    this.setState({
      isConfirmOpen: false,
      clickedItem: ""
    });
    this.props.setActiveItem(this.state.clickedItem);
  };

  onClose = () => {
    this.setState({
      isConfirmOpen: false,
      clickedItem: ""
    });
  };

  render() {
    const { activeItem } = this.props;

    return (
      <div>
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
            name="javascript"
            active={activeItem === "javascript"}
            onClick={this.handleItemClick}
          >
            <Icon name="code" />
            Custom
          </Menu.Item>
        </Menu>
        <Modal open={this.state.isConfirmOpen} basic size="small">
          <Header icon="bomb" content="You will loose the content" />
          <Modal.Content>
            <p>This will reset the current content in the editor. Proceed?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={this.onClose}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={this.onConfirm}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
