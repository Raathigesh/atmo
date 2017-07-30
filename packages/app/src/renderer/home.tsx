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
  Input,
  Dropdown,
  Label
} from "semantic-ui-react";
import DevTools from "mobx-react-devtools";
import Side from "./components/sidebar/Sidebar";
import ProjectPreference from "./components/Preference/Preference";
import Endpoint from "./store/endpoint/Endpoint";
import IntroDialog from "./components/IntroDialog";
import AppStore from "./store/AppStore";
import ViewStore from "./store/ViewStore";
import { ProjectStore } from "./store/ProjectStore";
import Preference from "./store/Preference";
import { Notification } from "./store/NotificationStore";
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
            remoteDeploy={project.remoteDeploy}
          />
          <Sidebar.Pusher>
            <Notify message={notification.message} level={notification.level} />
            <Composer
              baseUrl={project.baseUrl}
              onUrlClick={project.openUrl}
              endpoint={state.currentEndpoint}
              setUrl={state.currentEndpoint.setUrl}
            />
            <ProjectPreference
              open={view.isProjectPreferenceOpen}
              setZeitToken={project.setZeitToken}
              close={view.closeProjectPreferenceDialog}
              preference={project.preference}
              browseCertPath={project.getCertificatePath}
              browseKeyPath={project.getKeyPath}
              browseAssetPath={project.getAssetPath}
            />
            <IntroDialog
              open={view.isProjectIntro}
              openProject={project.openProject}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}
