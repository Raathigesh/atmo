import * as React from "react";
import { observer } from "mobx-react";
import { Header, Button, Input, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Preference from "../../store/Preference";

interface IAdvancedPreference {
  preference: Preference;
  browseCertPath: () => void;
  browseKeyPath: () => void;
}

const ClearDiv = styled.div`height: 10px;`;

function AdvancedPreference({
  preference,
  browseCertPath,
  browseKeyPath
}: IAdvancedPreference) {
  return (
    <div>
      <Header size="tiny">
        Zeit Access Token
        <Header.Subheader>
          Manage your account settings and set e-mail preferences.
        </Header.Subheader>
      </Header>
      <Input placeholder="" fluid floated="right" />

      <Header size="tiny" dividing>
        Certificate
        <Header.Subheader>Configure SSL certificates</Header.Subheader>
      </Header>

      <Input
        fluid
        label="Certificate file"
        icon={
          <Icon
            name="folder open outline"
            inverted
            circular
            link
            onClick={browseCertPath}
          />
        }
        onChange={(event: any, value: any) => {
          preference.setCertificatePath(value);
        }}
        value={preference.certificatePath}
      />
      <ClearDiv />
      <Input
        fluid
        label="Key file"
        icon={
          <Icon
            name="folder open outline"
            inverted
            circular
            link
            onClick={browseKeyPath}
          />
        }
        value={preference.keyPath}
        onChange={(event: any, value: any) => {
          preference.setKeyPath(value);
        }}
      />
    </div>
  );
}

export default observer(AdvancedPreference);
