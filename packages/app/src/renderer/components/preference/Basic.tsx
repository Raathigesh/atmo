import * as React from "react";
import { observer } from "mobx-react";
import { Header, Button, Input, Icon } from "semantic-ui-react";
import Preference from "../../store/Preference";

interface IBasicPreference {
  preference: Preference;
  browseAssetPath: () => void;
}

function BasicPreference({ preference, browseAssetPath }: IBasicPreference) {
  return (
    <div>
      <Header size="tiny">
        Port
        <Header.Subheader>Configure the server port</Header.Subheader>
      </Header>
      <Input
        placeholder=""
        fluid
        floated="right"
        type="number"
        value={preference.port}
        onChange={(event: any, data: any) => {
          preference.setPort(data.value);
        }}
      />
      <Header size="tiny">
        Static assets
        <Header.Subheader>
          You can choose a directory to serve static assets
        </Header.Subheader>
      </Header>
      <Input
        fluid
        icon={
          <Icon
            name="folder open outline"
            inverted
            circular
            link
            onClick={browseAssetPath}
          />
        }
        onChange={(event: any, value: any) => {
          preference.setAssetsDirectory(value);
        }}
        value={preference.assetsDirectory}
      />
    </div>
  );
}

export default observer(BasicPreference);
