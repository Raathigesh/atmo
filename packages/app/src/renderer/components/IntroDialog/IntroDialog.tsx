import * as React from "react";
import {
  Modal,
  Header,
  Button,
  Grid,
  List,
  Divider,
  Input,
  Icon,
  Message
} from "semantic-ui-react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { IRecentProject } from "../../store/ProjectStore";
import RecentProjects from "./RecentProjects";

interface IIntroDialog {
  open: boolean;
  onCreateProject: (name: string) => void;
  openProject: () => void;
  recentProjects: IRecentProject[];
  onRecentProjectDelete: (path: string) => void;
  onProjectClick: (path: string) => void;
}

const Logo = styled.img`
  height: 40px !important;
  width: 183px !important;
  margin-bottom: 9px;
`;

const RecentProjectColumn = styled(Grid.Column)`
  border-left: 1px solid #ececec;
`;

const LogoHeader = styled(Header)`
  width: 100%;
  text-align: center;
`;

function IntroDialog({
  open,
  recentProjects,
  openProject,
  onCreateProject,
  onRecentProjectDelete,
  onProjectClick
}: IIntroDialog) {
  let createProjectInput = null;
  return (
    <Modal dimmer="blurring" open={open}>
      <Modal.Content image>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <div>
                <LogoHeader as="h2">
                  <Logo
                    className="ui mini right spaced image"
                    src={require("../../assets/darkLogo.png")}
                  />
                </LogoHeader>
                <Input
                  ref={element => (createProjectInput = element)}
                  placeholder="Give the project a name"
                  fluid
                  defaultValue=""
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      onCreateProject(event.target.value);
                    }
                  }}
                  action
                >
                  <input />
                  <Button
                    content="Create"
                    icon="right arrow"
                    labelPosition="right"
                    basic
                    color="orange"
                    onClick={() => {
                      onCreateProject(createProjectInput.inputRef.value);
                    }}
                  />
                </Input>
                <Divider horizontal>Or</Divider>
                <Button basic color="orange" onClick={openProject} fluid>
                  Open a saved project
                </Button>
              </div>
            </Grid.Column>

            <RecentProjectColumn width={8}>
              <RecentProjects
                recentProjects={recentProjects}
                onDeleteRecentProject={onRecentProjectDelete}
                onProjectClick={onProjectClick}
              />
            </RecentProjectColumn>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default observer(IntroDialog);
