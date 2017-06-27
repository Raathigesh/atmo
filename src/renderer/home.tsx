import * as React from "react";
const { css } = require("glamor");
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Composer from "./components/composer";
import app from "./store/app";
import styled from "styled-components";

export default function Home() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const SidebarContainer = styled.div`
    width: 300px;
  `;

  const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const ComposerContainer = styled.div`
    width: 100%;
  `;

  return (
    <Container>
      <div>
        <Header />
      </div>
      <ContentContainer>
        <SidebarContainer>
          <SideBar />
        </SidebarContainer>
        <ComposerContainer>
          <Composer endpoint={app.endpoints[0]} />
        </ComposerContainer>
      </ContentContainer>
    </Container>
  );
}
