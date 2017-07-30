import * as React from "react";
import { Header, Modal, Button, Input, Icon, Tab } from "semantic-ui-react";
import Preference from "../store/Preference";

interface IPreference {
  open: boolean;
  preference: Preference;
  close: () => void;
}

const RemoteDeploy = ({ open, close, preference }: IPreference) => {
  return (
    <Modal open={open}>
      <Modal.Header>Zeit Deployments</Modal.Header>
      <Modal.Content />
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
};

export default RemoteDeploy;
