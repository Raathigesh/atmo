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
import IntroDialog from "./components/introDialog";
import AppStore from "./store/AppStore";
import ViewStore from "./store/ViewStore";

interface IHome {
  currentEndpoint?: Endpoint;
  endpoints: Endpoint[];
  isPreferenceDialogOpen: boolean;
  setUrl: (url: string) => void;
  setCurrentEndpoint: (id: string) => void;
  addEndpoint: () => void;
  onEndpointDelete: (id: string) => void;
  moveEndpoint: (fromIndex: number, toIndex: number) => void;
  openPreferenceDialog: () => void;
  closePreferenceDialog: () => void;
}

function Home({
  endpoints,
  currentEndpoint,
  isPreferenceDialogOpen,
  setUrl,
  addEndpoint,
  setCurrentEndpoint,
  onEndpointDelete,
  moveEndpoint,
  openPreferenceDialog,
  closePreferenceDialog
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
          openPreferenceDialog={openPreferenceDialog}
        />
        <Sidebar.Pusher>
          <Composer endpoint={currentEndpoint} setUrl={setUrl} />
          <SystemSettings
            open={isPreferenceDialogOpen}
            close={closePreferenceDialog}
          />
          <IntroDialog />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
}

export default inject(
  ({ state, view }: { state: AppStore; view: ViewStore }) => ({
    endpoints: state.endpoints,
    currentEndpoint: state.currentEndpoint,
    setUrl: state.currentEndpoint.setUrl,
    setCurrentEndpoint: state.setCurrentEndpoint,
    addEndpoint: state.addEndpoint,
    onEndpointDelete: state.deleteEndpoint,
    moveEndpoint: state.moveEndpoint,
    openPreferenceDialog: view.openProjectPreferenceDialog,
    isPreferenceDialogOpen: view.isProjectPreferenceOpen,
    closePreferenceDialog: view.closeProjectPreferenceDialog
  })
)(Home as any);
