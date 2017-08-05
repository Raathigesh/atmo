import * as React from "react";
import { List, Header, Icon, Message } from "semantic-ui-react";
import { IRecentProject } from "../../store/ProjectStore";
import styled from "styled-components";

interface IRecentProjects {
  recentProjects: IRecentProject[];
}

const NoRecentProjectContainer = styled.div`
  text-align: center;
  margin-top: 60px;
  color: #3d3c3c;
`;

export default function RecentProjects({ recentProjects }: IRecentProjects) {
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
            <List.Item>
              <List.Content floated="right">
                <Icon link name="close" />
              </List.Content>
              <List.Icon name="cube" />
              <List.Content>
                <List.Header as="a">
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
