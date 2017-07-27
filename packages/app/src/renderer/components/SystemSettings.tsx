import * as React from "react";
import { observer } from "mobx-react";
import { Header, Modal, Button, Input, Icon } from "semantic-ui-react";
import Preference from "../store/Preference";

interface ISystemSettings {
  open: boolean;
  preference: Preference;
  close: () => void;
  browseCertPath: () => void;
  browseKeyPath: () => void;
}

function SystemSettings({
  open,
  close,
  preference,
  browseCertPath
}: ISystemSettings) {
  return (
    <Modal open={open}>
      <Modal.Header>Project Preference</Modal.Header>
      <Modal.Content>
        <Header size="tiny">
          Zeit Access Token
          <Header.Subheader>
            Manage your account settings and set e-mail preferences.
          </Header.Subheader>
        </Header>
        <Input placeholder="" fluid floated="right" />

        <Header size="tiny">
          Certificate
          <Header.Subheader>Configure SSL certificates</Header.Subheader>
        </Header>
        <Input
          fluid
          icon={
            <Icon
              name="certificate"
              inverted
              circular
              link
              onClick={browseCertPath}
            />
          }
          onChange={(event: any, value: any) => {
            preference.setCertificatePath(value);
          }}
          defaultValue={preference.certificatePath}
        />
        <Input
          fluid
          icon={
            <Icon name="key" inverted circular link onClick={browseCertPath} />
          }
          defaultValue={preference.keyPath}
          onChange={(event: any, value: any) => {
            preference.setKeyPath(value);
          }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Done"
          onClick={close}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default observer(SystemSettings);
