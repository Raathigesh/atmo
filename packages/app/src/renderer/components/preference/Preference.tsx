import * as React from "react";
import { Header, Modal, Button, Input, Icon, Tab } from "semantic-ui-react";
import Basic from "./Basic";
import Advanced from "./Advanced";
import Preference from "../../store/Preference";

interface IPreference {
  open: boolean;
  preference: Preference;
  setZeitToken: (token: string) => void;
  close: () => void;
  browseCertPath: () => void;
  browseKeyPath: () => void;
  browseAssetPath: () => void;
  onOpenUrl: (url: string) => void;
}

const PreferenceModal = ({
  open,
  close,
  preference,
  setZeitToken,
  browseCertPath,
  browseKeyPath,
  browseAssetPath,
  onOpenUrl
}: IPreference) => {
  const panes = [
    {
      menuItem: "Basic",
      render: () =>
        <Tab.Pane attached={false}>
          <Basic preference={preference} browseAssetPath={browseAssetPath} />
        </Tab.Pane>
    },
    {
      menuItem: "Advanced",
      render: () =>
        <Tab.Pane attached={false}>
          <Advanced
            preference={preference}
            setZeitToken={setZeitToken}
            browseCertPath={browseCertPath}
            browseKeyPath={browseKeyPath}
            onOpenUrl={onOpenUrl}
          />
        </Tab.Pane>
    }
  ];

  return (
    <Modal open={open}>
      <Modal.Header>Project Preference</Modal.Header>
      <Modal.Content>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
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
};

export default PreferenceModal;
