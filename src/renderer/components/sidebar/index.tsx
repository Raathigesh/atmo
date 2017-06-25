import * as React from "react";
import { Menu, MenuItem, MenuDivider, Intent } from "@blueprintjs/core";
import Card from "../../../lib/components/card";

const componentName = () => {
  return (
    <Card>
      <Menu>
        <MenuItem
          iconName="pt-icon-link"
          onClick={this.handleClick}
          text="/home/view"
          intent={Intent.PRIMARY}
        />
        <MenuItem
          iconName="pt-icon-link"
          onClick={this.handleClick}
          text="/home/view"
        />
        <MenuItem
          iconName="pt-icon-link"
          onClick={this.handleClick}
          text="/home/view"
        />
        <MenuDivider />
        <MenuItem text="Settings..." iconName="cog" />
      </Menu>
    </Card>
  );
};

export default componentName;
