import * as React from "react";
import { Menu, MenuItem, MenuDivider, Intent } from "@blueprintjs/core";
import styled from "styled-components";
import Card from "../card";

interface ISideBar {
  className?: string;
}

const SideBar = ({ className }: ISideBar) => {
  return (
    <Card className={className}>
      <Menu>
        <MenuItem
          iconName="pt-icon-circle"
          onClick={this.handleClick}
          text="/home/view"
          intent={Intent.PRIMARY}
          label={<span className="pt-icon-drag-handle-vertical" />}
        />
        <MenuItem
          iconName="pt-icon-circle"
          onClick={this.handleClick}
          text="/home/view"
        />
        <MenuItem
          iconName="pt-icon-circle"
          onClick={this.handleClick}
          text="/home/view"
        />
      </Menu>
    </Card>
  );
};

export default styled(SideBar)`
  height: 100%;
  margin-right: 10px;
  padding: 3px !important;
`;
