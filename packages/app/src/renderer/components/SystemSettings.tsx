import * as React from "react";
import { Header, Modal, Button, Input } from "semantic-ui-react";

interface ISystemSettings {
  open: boolean;
  close: () => void;
}

export default function SystemSettings({ open, close }: ISystemSettings) {
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
