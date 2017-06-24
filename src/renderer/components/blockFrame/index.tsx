import * as React from "react";
import Card from "../card";
import Menu from "./menu";
import { css } from "glamor";
import styled from "styled-components";

const BlockFrame = ({
  title,
  children,
  hideMenu = false
}: {
  title: string;
  children?: any;
  hideMenu?: boolean;
}) => {
  const cardContainer = css({
    marginBottom: "15px",
    padding: "5px !important"
  });

  const menuStyle = css({
    padding: "3px",
    backgroundColor: "#65a4ff",
    paddingLeft: "7px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "baseline",
    margin: "-5px",
    borderRadius: "3px 0px 0px 3px",
    marginRight: "5px"
  });

  const blockStyle = css({});

  const Container = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <Card style={cardContainer}>
      <Container>
        <div {...menuStyle}>
          <Menu />
        </div>
        <div>
          {children}
        </div>
      </Container>
    </Card>
  );
};

export default BlockFrame;
