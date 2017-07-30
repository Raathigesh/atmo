import * as React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  Icon,
  Label,
  Dropdown
} from "semantic-ui-react";
import { observer } from "mobx-react";
import styled from "styled-components";
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
  remoteDeploy: () => void;
}

const MinimalSidebar = styled(Sidebar)`
    background-color: #2d2d2d !important;
    color: gray;
  `;

const SideBarItem = styled(Menu.Item)`
  background-color: #7d7d7d !important;
`;

const Logo = styled.img`
  height: 40px !important;
  margin-left: 36px !important;
  width: 183px !important;
`;

function displayUrl(url: string) {
  if (url.length > 20) {
    return `${url.substring(0, 20)}...`;
  }

  return url;
}

const UrlElement = SortableElement(Url);
const UrlContainer = SortableContainer(Menu.Menu);

function Side({
  endpoints,
  currentEndpoint,
  addEndpoint,
  onEndpointSelection,
  onEndpointDelete,
  moveEndpoint,
  openPreferenceDialog,
  save,
  deploy,
  remoteDeploy
}: ISideBar) {
  const urls = endpoints.map((endpoint, index) => {
    return (
      <UrlElement
        key={index}
        index={index}
        label={displayUrl(endpoint.url)}
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
        <Logo
          className="ui mini right spaced image"
          src={require("../../assets/logo.png")}
        />
      </Menu.Item>
      <SideBarItem
        name="browse"
        as="a"
        color="blue"
        onClick={() => {
          addEndpoint("/unicorns");
        }}
      >
        <Icon name="plus" />
        New Endpoint
      </SideBarItem>
      <SideBarItem name="browse" as="a" color="blue" onClick={deploy}>
        <Icon name="wizard" />
        Deploy
      </SideBarItem>
      <SideBarItem name="browse" as="a" color="blue" onClick={remoteDeploy}>
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
