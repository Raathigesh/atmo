import * as React from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";

export default function({ isOpen, onConfirmation, onDecline }) {
  return (
    <Modal open={isOpen} basic size="small">
      <Header icon="archive" content="Close project" />
      <Modal.Content>
        <p>Are you sure you want to close this project?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={onDecline}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={onConfirmation}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
