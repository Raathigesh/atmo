import * as React from "react";
import { List, Header, Icon, Message } from "semantic-ui-react";
import { observer } from "mobx-react";
import { IRecentProject } from "../../store/ProjectStore";
import styled from "styled-components";

interface IRecentProjects {
  recentProjects: IRecentProject[];
  onDeleteRecentProject: (path: string) => void;
  onProjectClick: (path: string) => void;
}

const NoRecentProjectContainer = styled.div`
  text-align: center;
  margin-top: 60px;
  color: #3d3c3c;
`;

function RecentProjects({
  recentProjects,
  onDeleteRecentProject,
  onProjectClick
}: IRecentProjects) {
  if (recentProjects.length === 0) {
    return (
      <NoRecentProjectContainer>
        <Icon name="time" size="large" />
        <Header.Subheader>No recent projects</Header.Subheader>
      </NoRecentProjectContainer>
    );
  }

  return (
    <div>
      <Header as="h5" dividing>
        Recent projects
      </Header>
      <List>
        {recentProjects.map(recentProject => {
          return (
            <List.Item key={recentProject.path}>
              <List.Content floated="right">
                <Icon
                  link
                  name="close"
                  onClick={() => {
                    onDeleteRecentProject(recentProject.path);
                  }}
                />
              </List.Content>
              <List.Icon name="cube" />
              <List.Content>
                <List.Header
                  as="a"
                  onClick={() => {
                    onProjectClick(recentProject.path);
                  }}
                >
                  {recentProject.name}
                </List.Header>
                <List.Description>
                  {recentProject.path}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}

export default observer(RecentProjects);
