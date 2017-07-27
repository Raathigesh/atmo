import * as React from "react";
import Composer from "./components/composer/Composer";
import { inject, observer } from "mobx-react";
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
import Side from "./components/sidebar/Sidebar";
import SystemSettings from "./components/SystemSettings";
import Endpoint from "./store/endpoint/Endpoint";
import IntroDialog from "./components/IntroDialog";
import AppStore from "./store/AppStore";
import ViewStore from "./store/ViewStore";
import ProjectStore from "./store/ProjectStore";
import Preference from "./store/Preference";
import Notification, { INotification } from "./store/NotificationStore";
import Notify from "./components/Notification";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WideSidebar = styled(Sidebar)`
    width: 200px !important;
`;

interface IHome {
  state?: AppStore;
  view?: ViewStore;
  project?: ProjectStore;
  notification?: Notification;
}

@inject("state")
@inject("view")
@inject("project")
@inject("notification")
@observer
export default class Home extends React.Component<IHome, {}> {
  render() {
    const { state, view, project, notification } = this.props;
    return (
      <Container>
        <DevTools />
        <Sidebar.Pushable as={Segment}>
          <Side
            onEndpointSelection={state.setCurrentEndpoint}
            addEndpoint={state.addEndpoint}
            endpoints={state.endpoints}
            currentEndpoint={state.currentEndpoint}
            onEndpointDelete={state.deleteEndpoint}
            moveEndpoint={state.moveEndpoint}
            openPreferenceDialog={view.openProjectPreferenceDialog}
            save={project.save}
            deploy={project.deploy}
          />
          <Sidebar.Pusher>
            <Composer
              endpoint={state.currentEndpoint}
              setUrl={state.currentEndpoint.setUrl}
            />
            <SystemSettings
              open={view.isProjectPreferenceOpen}
              close={view.closeProjectPreferenceDialog}
              preference={project.preference}
              browseCertPath={project.getCertificatePath}
              browseKeyPath={project.getKeyPath}
            />
            <IntroDialog
              open={view.isProjectIntro}
              openProject={project.open}
            />
            <Notify notification={notification.notification} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}
