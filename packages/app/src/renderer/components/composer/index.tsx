import * as React from "react";
import styled from "styled-components";
const SplitPanel = require("react-split-pane");
import Card from "../card";
import Url from "./url";
import Headers from "./headers";
import Editor from "./editor";
import Response from "./response";
import ResponseCode from "./responseCode";
import Delay from "./delay";
import { Segment, Label } from "semantic-ui-react";
import Section from "./section";
import { observer } from "mobx-react";
import Endpoint from "../../store/endpoint/Endpoint";

interface IComponser {
  endpoint: Endpoint;
  setUrl: (url: string) => void;
}

const Composer = ({ endpoint }: IComponser) => {
  const ComposerCard = styled(Card)`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `;

  const ControlPanel = styled.div`padding: 10px;`;

  return (
    <ComposerCard>
      <SplitPanel split="vertical" defaultSize={600}>
        <ControlPanel>
          <Segment basic>
            <Section title="Url">
              <Url
                url={endpoint.url}
                onUrlChange={endpoint.setUrl}
                onMethodChange={endpoint.setMethod}
              />
            </Section>

            <Section title="Headers">
              <Headers />
            </Section>

            <Section title="Response Type">
              <Response />
            </Section>

            <Section title="Response Code">
              <ResponseCode />
            </Section>

            <Section title="Simulate Delay">
              <Delay />
            </Section>
          </Segment>
        </ControlPanel>
        <div>
          <Editor />
        </div>
      </SplitPanel>
    </ComposerCard>
  );
};

export default observer(Composer);
