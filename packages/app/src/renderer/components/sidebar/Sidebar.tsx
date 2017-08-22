import * as React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  Icon,
  Label,
  Dropdown,
  Button
} from "semantic-ui-react";
import { observer } from "mobx-react";
import styled from "styled-components";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

import Url from "./EndpointItem";
import Card from "../Card";
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
  closeProject: () => void;
}

const MinimalSidebar = styled(Sidebar)`
    background-color: #2d2d2d !important;
    color: gray;
`;

const SideBarItem = styled(Menu.Item)`
  background-color: #1b1b1b !important;
  border-right: ${props =>
    props.highlight
      ? "5px solid #ff6a4d !important;"
      : "5px solid #3c3c3c !important;"};
  width: ${props => (props.divide ? "50%" : "100%")};
  float: ${props => (props.float === "right" ? "right" : "")};
`;

const Logo = styled.img`
  height: 40px !important;
  margin-left: 20px !important;
  width: 183px !important;
`;

function displayUrl(url: string) {
  if (url.length > 16) {
    return `${url.substring(0, 16)}...`;
  }
  return url;
}

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
  remoteDeploy,
  closeProject
}: ISideBar) {
  const UrlContainer = SortableContainer(Menu.Menu);
  const urls = endpoints.map((endpoint, index) => {
    const UrlElement = SortableElement(Url);
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
        isEnabled={endpoints.length > 1}
      />
    );
  });

  return (
    <MinimalSidebar as={Menu} visible={true} vertical inverted>
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
      <SideBarItem name="browse" as="a" onClick={deploy} highlight>
        <Icon name="wizard" />
        Deploy
      </SideBarItem>
      <SideBarItem name="browse" as="a" onClick={remoteDeploy}>
        <Icon name="cloud" />
        Remote Deploy
      </SideBarItem>
      <SideBarItem name="browse" as="a" onClick={openPreferenceDialog}>
        <Icon name="options" />
        Project Settings
      </SideBarItem>
      <SideBarItem
        name="browse"
        as="a"
        divide
        float="right"
        onClick={closeProject}
      >
        <Icon name="window close outline" />
        Close
      </SideBarItem>
      <SideBarItem name="browse" as="a" divide onClick={save}>
        <Icon name="save" />
        Save
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
