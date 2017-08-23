import * as React from "react";
import {
  Header,
  Modal,
  Button,
  Input,
  Icon,
  Tab,
  Table,
  Segment,
  Message
} from "semantic-ui-react";
import styled from "styled-components";
import Preference from "../store/Preference";
import Deployment from "../store/deployment/Deployment";
import { observer } from "mobx-react";

interface IPreference {
  projectName: string;
  open: boolean;
  preference: Preference;
  deployments: Deployment[];
  isDeploying: boolean;
  isFetching: boolean;
  isTokenConfigured: boolean;
  close: () => void;
  openInBrowser: (url: string) => void;
  deployProject: () => void;
  deleteDeployment: (uid: string) => void;
  fetchDeployments: () => void;
}

function prefixProtocol(url) {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }

  return url;
}

const DeploymentUrl = styled.a`cursor: pointer;`;

const RemoteDeploy = ({
  projectName,
  open,
  close,
  deployments,
  preference,
  isDeploying,
  isFetching,
  openInBrowser,
  deployProject,
  deleteDeployment,
  fetchDeployments,
  isTokenConfigured
}: IPreference) => {
  return (
    <Modal open={open}>
      <Modal.Header>Zeit Deployments</Modal.Header>
      <Modal.Content>
        <Segment basic loading={isFetching}>
          {isTokenConfigured === false &&
            <Message
              warning
              header="Zeit API token is not configured"
              content="Configure Zeit's API token by vising project preference > Advanced. Getting a token is so easy."
            />}
          {deployments.length === 0 &&
            isTokenConfigured &&
            <Message visible>
              No deployments available for this project
            </Message>}
          {deployments.length > 0 &&
            isTokenConfigured &&
            <Table basic="very" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Crated on</Table.HeaderCell>
                  <Table.HeaderCell>Url</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {deployments.map((deployment, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        {deployment.date.toLocaleString("en-us", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </Table.Cell>
                      <Table.Cell>
                        <DeploymentUrl
                          onClick={() => {
                            openInBrowser(prefixProtocol(deployment.url));
                          }}
                        >
                          {prefixProtocol(deployment.url)}
                        </DeploymentUrl>
                      </Table.Cell>
                      <Table.Cell>
                        <Icon
                          link
                          name="trash outline"
                          onClick={() => {
                            deleteDeployment(deployment.uid);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    Shows the last 10 deployments.
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>}
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button basic floated="left" content="Close" onClick={close} />
        <Button
          basic
          icon="refresh"
          labelPosition="right"
          content="Fetch deployments"
          onClick={fetchDeployments}
          disabled={!isTokenConfigured}
        />
        <Button
          basic
          positive
          icon="lightning"
          labelPosition="right"
          content="Deploy now"
          onClick={deployProject}
          loading={isDeploying}
          disabled={!isTokenConfigured}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default observer(RemoteDeploy);
