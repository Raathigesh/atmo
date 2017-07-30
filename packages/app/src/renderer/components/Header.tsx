import * as React from "react";
import styled from "styled-components";
import { Button, Dropdown, Menu, Header, Icon } from "semantic-ui-react";

const StyledMenu = styled.div`
  padding-top: 8px;
  padding-left: 20px;
  margin-bottom: 0px !important;
  border-radius: 0px !important;
  box-shadow: initial !important;
`;

const ServerStatus = styled(Icon)`
  background-color: #4eb14e !important;
`;

class Info extends React.Component<{}, {}> {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <StyledMenu>
        <ServerStatus name="check" circular size="small" />
        Server is up and running
        <ServerStatus name="check" circular size="small" />
        Your remote deploy
      </StyledMenu>
    );
  }
}

export default Info;
