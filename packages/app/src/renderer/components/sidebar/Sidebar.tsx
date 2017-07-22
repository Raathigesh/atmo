import * as React from "react";
import { Menu, MenuItem, Sidebar, Icon, Label } from "semantic-ui-react";
import { observer } from "mobx-react";
import styled from "styled-components";
const generateName = require("sillyname");
import { withHandlers, compose } from "recompose";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

import Url from "./EndpointItem";
import Card from "../card";
import Endpoint from "../../store/endpoint/Endpoint";

interface ISideBar {
  endpoints: Endpoint[];
  currentEndpoint: Endpoint;
  addEndpoint: (url: string) => void;
  onEndpointSelection: (id: string) => void;
  onEndpointDelete: (id: string) => void;
  moveEndpoint: (fromIndex: number, toIndex: number) => void;
  openPreferenceDialog: () => void;
  save: () => void;
  deploy: () => void;
}

const MinimalSidebar = styled(Sidebar)`
    background-color: #1D3557 !important;
    color: gray;
  `;

const SideBarItem = styled(Menu.Item)`
  background-color: grey !important;
`;

function Side({
  endpoints,
  currentEndpoint,
  addEndpoint,
  onEndpointSelection,
  onEndpointDelete,
  moveEndpoint,
  openPreferenceDialog,
  save,
  deploy
}: ISideBar) {
  const UrlElement = SortableElement(Url);
  const UrlContainer = SortableContainer(Menu.Menu);

  const urls = endpoints.map((endpoint, index) => {
    return (
      <UrlElement
        index={index}
        label={endpoint.url}
        onClick={onEndpointSelection}
        id={endpoint.id}
        method={endpoint.method}
        active={endpoint.id === currentEndpoint.id}
        onDelete={onEndpointDelete}
      />
    );
  });

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
      <SideBarItem
        name="browse"
        as="a"
        color="blue"
        onClick={() => {
          addEndpoint(`/${generateName()}`.replace(" ", ""));
        }}
      >
        <Icon name="plus" />
        New Endpoint
      </SideBarItem>
      <SideBarItem name="browse" as="a" color="blue" onClick={deploy}>
        <Icon name="wizard" />
        Deploy
      </SideBarItem>
      <SideBarItem name="browse" as="a" color="blue">
        <Icon name="cloud" />
        Remote Deploy
      </SideBarItem>
      <SideBarItem name="browse" as="a" color="blue" onClick={save}>
        <Icon name="save" />
        Save
      </SideBarItem>
      <SideBarItem name="browse" as="a" onClick={openPreferenceDialog}>
        <Icon name="options" />
        Project Settings
      </SideBarItem>
      <Menu.Item>
        <UrlContainer
          useDragHandle
          onSortEnd={move => {
            moveEndpoint(move.oldIndex, move.newIndex);
          }}
        >
          {urls}
        </UrlContainer>
      </Menu.Item>
    </MinimalSidebar>
  );
}

export default observer(Side);
