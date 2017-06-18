import * as React from "react";

const Menu = ({ style }: { style?: any }) => {
  return (
    <div className="pt-button-group pt-minimal" {...style}>
      <a className="pt-button pt-icon-trash" role="button">Remove</a>
      <a className="pt-button pt-icon-move" role="button">Move</a>
    </div>
  );
};

export default Menu;
