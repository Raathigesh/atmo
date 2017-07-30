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
  close: () => void;
  openInBrowser: (url: string) => void;
  deployProject: () => void;
  deleteDeployment: (uid: string) => void;
  fetchDeployments: () => void;
}

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
  fetchDeployments
}: IPreference) => {
  return (
    <Modal open={open}>
      <Modal.Header>Zeit Deployments</Modal.Header>
      <Modal.Content>
        <Segment basic loading={isFetching}>
          {deployments.length === 0 &&
            <Message visible>
              No deployments available for this project
            </Message>}
          {deployments.length > 0 &&
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
                        {deployment.date.toString()}
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          onClick={() => {
                            openInBrowser(deployment.url);
                          }}
                        >
                          {deployment.url}
                        </a>
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
        />
        <Button
          basic
          positive
          icon="lightning"
          labelPosition="right"
          content="Deploy now"
          onClick={deployProject}
          loading={isDeploying}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default observer(RemoteDeploy);
