import * as React from "react";
import Composer from "./components/composer";
import { inject } from "mobx-react";
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
import DevTools from "mobx-react-devtools";
import Side from "./components/sidebar";
import SystemSettings from "./components/systemSettings";
import Endpoint from "./store/endpoint/Endpoint";
import AppStore from "./store/AppStore";

interface IHome {
  currentEndpoint?: Endpoint;
  endpoints: Endpoint[];
  setUrl: (url: string) => void;
  setCurrentEndpoint: (id: string) => void;
  addEndpoint: () => void;
  onEndpointDelete: (id: string) => void;
  moveEndpoint: (fromIndex: number, toIndex: number) => void;
}

function Home({
  endpoints,
  currentEndpoint,
  setUrl,
  addEndpoint,
  setCurrentEndpoint,
  onEndpointDelete,
  moveEndpoint
}: IHome) {
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
        <Side
          onEndpointSelection={setCurrentEndpoint}
          addEndpoint={addEndpoint}
          endpoints={endpoints}
          currentEndpoint={currentEndpoint}
          onEndpointDelete={onEndpointDelete}
          moveEndpoint={moveEndpoint}
        />
        <Sidebar.Pusher>
          <Composer endpoint={currentEndpoint} setUrl={setUrl} />
          <SystemSettings />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
}

export default inject(({ state }: { state: AppStore }) => ({
  endpoints: state.endpoints,
  currentEndpoint: state.currentEndpoint,
  setUrl: state.currentEndpoint.setUrl,
  setCurrentEndpoint: state.setCurrentEndpoint,
  addEndpoint: state.addEndpoint,
  onEndpointDelete: state.deleteEndpoint,
  moveEndpoint: state.moveEndpoint
}))(Home as any);
