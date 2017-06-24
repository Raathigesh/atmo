import * as React from "react";
import Card from "../card";
import Menu from "./menu";
import { css } from "glamor";

const BlockFrame = ({
  title,
  children,
  hideMenu = false
}: { title: string; children?: any; hideMenu?: boolean }) => {
  const cardContainer = css({
    marginBottom: "15px",
    padding: "5px !important"
  });

  const menuStyle = css({
    borderTop: "1px solid #efefef",
    padding: "3px",
    backgroundColor: "#f7f7f7",
    paddingLeft: "7px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "baseline",
    margin: "-5px",
    borderRadius: "3px",
    marginBottom: "2px"
  });

  const blockStyle = css({});

  return (
    <Card style={cardContainer}>
      {!hideMenu &&
        <div {...menuStyle}>
          <span>
            {title}
          </span>
          <Menu />
        </div>}
      {children}
    </Card>
  );
};

export default BlockFrame;
