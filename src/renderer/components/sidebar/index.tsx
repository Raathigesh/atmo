import * as React from "react";
import { Menu, MenuItem, Sidebar, Icon, Label } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import { withHandlers } from "recompose";

import Url from "./EndpointItem";
import Card from "../card";
import { IAppStore } from "../../store/AppStore";

interface ISideBar {
  state?: IAppStore;
  create?: () => void;
}

function Side({ state, create }: ISideBar) {
  const MinimalSidebar = styled(Sidebar)`
    background-color: #1D3557 !important;
    color: gray;
  `;

  const urls = state.endpoints.map(endpoint => <Url label={endpoint.url} />);

  return (
    <MinimalSidebar as={Menu} animation="push" visible={true} vertical inverted>
      <Menu.Item>
        <img
          className="ui mini right spaced image"
          src={require("../../assets/logo.png")}
        />
        <strong>
          Atmo &nbsp;<small>
            <em>1.0.0</em>
          </small>
        </strong>
      </Menu.Item>
      <Menu.Item>
        Endpoints
        <Menu.Menu>{urls}</Menu.Menu>
      </Menu.Item>
      <Menu.Item name="browse" as="a" color="blue" onClick={create}>
        <Icon name="plus" />
        New Endpoint
      </Menu.Item>
      <Menu.Item name="browse" as="a" color="blue">
        <Icon name="wizard" />
        Deploy
      </Menu.Item>
      <Menu.Item name="browse" as="a" color="blue">
        <Icon name="cloud" />
        Remote Deploy
      </Menu.Item>
      <Menu.Item name="browse" as="a">
        <Icon name="options" />
        Project Settings
      </Menu.Item>
    </MinimalSidebar>
  );
}

export default inject("state")(
  observer(
    withHandlers({
      create: (props: ISideBar) => {
        return () => {
          props.state.addEndpoint("");
        };
      }
    })(Side)
  )
);
