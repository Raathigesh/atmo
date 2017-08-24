import * as React from "react";
import { observer } from "mobx-react";
import { Header, Button, Input, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Preference from "../../store/Preference";

interface IAdvancedPreference {
  preference: Preference;
  setZeitToken: (token: string) => void;
  browseCertPath: () => void;
  browseKeyPath: () => void;
  onOpenUrl: (url: string) => void;
}

const ClearDiv = styled.div`height: 10px;`;

function AdvancedPreference({
  preference,
  browseCertPath,
  browseKeyPath,
  setZeitToken,
  onOpenUrl
}: IAdvancedPreference) {
  return (
    <div>
      <Header size="tiny">
        Zeit Access Token
        <Header.Subheader>
          Click{" "}
          <a
            href="#"
            onClick={() => {
              onOpenUrl("https://zeit.co/account/tokens");
            }}
          >
            here
          </a>{" "}
          to generate a token from Zeit.
        </Header.Subheader>
      </Header>
      <Input
        placeholder=""
        fluid
        floated="right"
        value={preference.zeitToken}
        onChange={(event: any, data: any) => {
          setZeitToken(data.value);
        }}
      />

      <Header size="tiny" dividing>
        Certificate
        <Header.Subheader>
          {`Configure SSL. `}
          <a
            href="#"
            onClick={() => {
              onOpenUrl("https://zeit.co/account/tokens");
            }}
          >
            Here's how.
          </a>
        </Header.Subheader>
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
        onChange={(event: any, data: any) => {
          preference.setCertificatePath(data.value);
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
        onChange={(event: any, data: any) => {
          preference.setKeyPath(data.value);
        }}
      />
    </div>
  );
}

export default observer(AdvancedPreference);
