import * as React from "react";
const { css } = require("glamor");
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Composer from "./components/composer";

export default function Home() {
  const container = css({
    display: "flex",
    flexDirection: "column"
  });

  const sidebarContainer = css({
    width: "300px"
  });

  const contentContainer = css({
    display: "flex",
    flexDirection: "row"
  });

  const composerContainer = css({
    width: "100%"
  });

  return (
    <div {...container}>
      <div>
        <Header />
      </div>
      <div {...contentContainer}>
        <div {...sidebarContainer}>
          <SideBar />
        </div>
        <div {...composerContainer}>
          <Composer />
        </div>
      </div>
    </div>
  );
}
