import * as React from "react";
import Composer from "./components/composer";
import styled from "styled-components";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header,
  Input,
  Dropdown,
  Label
} from "semantic-ui-react";
import Side from "./components/sidebar";
import SystemSettings from "./components/systemSettings";

export default function Home() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `;

  const WideSidebar = styled(Sidebar)`
    width: 200px !important;
  `;

  return (
    <Container>
      <Sidebar.Pushable as={Segment}>
        <Side />
        <Sidebar.Pusher>
          <Composer />
          <SystemSettings />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
}
