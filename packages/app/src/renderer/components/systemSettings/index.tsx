import * as React from "react";
import { Header, Modal, Button, Input } from "semantic-ui-react";

export default function SystemSettings() {
  return (
    <Modal>
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
        />
      </Modal.Actions>
    </Modal>
  );
}
