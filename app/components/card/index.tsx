import * as React from "react";
import { css } from "glamor";

const Card = ({ children, style }: { children: any; style?: any }) => {
  return (
    <div className="pt-card pt-elevation-0 pt-elevation-1" {...style}>
      {children}
    </div>
  );
};

export default Card;
