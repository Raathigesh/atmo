import * as React from "react";
import Composer from "./components/composer";
import app from "./store/app";
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

export default function Home() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `;

  const WideSidebar = styled(Sidebar)`
    width: 200px !important;
  `;

  interface IUrl {
    label: string;
    link?: string;
  }

  const Url = ({ label, link }: IUrl) => {
    return (
      <Menu.Item as="a" name="search">
        <Label>GET</Label>
        <Icon name="circle thin" />
        {label}
      </Menu.Item>
    );
  };

  return (
    <Container>
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation="push" visible={true} vertical inverted>
          <Menu.Item>
            <img
              className="ui mini right spaced image"
              src={require("./assets/logo.png")}
            />
            <strong>
              Atmo &nbsp;<small>
                <em>1.0.0</em>
              </small>
            </strong>
          </Menu.Item>
          <Menu.Item>
            Endpoints
            <Menu.Menu>
              <Url label="/user" />
              <Url label="/user" />
              <Url label="/user" />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item name="browse" as="a">
            <Icon name="options" />
            Project Settings
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Composer />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
}
