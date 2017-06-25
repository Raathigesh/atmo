import * as React from "react";
import { Tab2, Tabs2, Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";
const brace = require("brace");
import "brace/mode/java";
import "brace/theme/monokai";

import BlockFrame from "../../../components/blockFrame";
import Json from "./panels/Json";
import SourceView from "./sourceView";

const Response = () => {
  const FullScreenJson = styled(Json)`
    width: calc(500vh - 500px)
  `;

  return (
    <BlockFrame title="Response">
      <SourceView isOpen={false}>
        <Tabs2 id="reponseTabs" onChange={this.handleTabChange}>
          <Tab2 id="json" title="Json" panel={<FullScreenJson />} />
          <Tab2 id="xml" title="Xml" panel={<FullScreenJson />} />
          <Tab2 id="text" title="Text" panel={<FullScreenJson />} />
        </Tabs2>
      </SourceView>
      Return JSON response
      <Button
        iconName="pt-icon-duplicate"
        text="View Response"
        intent={Intent.PRIMARY}
        className="pt-minimal"
      />
    </BlockFrame>
  );
};

export default Response;
