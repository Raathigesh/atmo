import * as React from "react";
import styled from "styled-components";
const SplitPanel = require("react-split-pane");
import Card from "../Card";
import Url from "./Url";
import Headers from "./Header";
import Editor from "./Editor";
import Response from "./Response";
import ResponseCode from "./responseCode/ResponseCode";
import Delay from "./Delay";
import { Segment, Label } from "semantic-ui-react";
import Section from "./Section";
import { observer } from "mobx-react";
import Endpoint from "../../store/endpoint/Endpoint";

interface IComponser {
  endpoint: Endpoint;
  setUrl: (url: string) => void;
}

const ComposerCard = styled(Card)`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `;

const ControlPanel = styled.div`padding: 10px;`;

const Composer = ({ endpoint }: IComponser) => {
  return (
    <ComposerCard>
      <SplitPanel
        split="vertical"
        defaultSize={600}
        paneStyle={{ overflow: "auto" }}
      >
        <ControlPanel>
          <Segment basic>
            <Section title="Url">
              <Url
                url={endpoint.url}
                onUrlChange={endpoint.setUrl}
                onMethodChange={endpoint.setMethod}
              />
            </Section>

            <Headers headers={endpoint.headers} currentEndpoint={endpoint} />

            <Section title="Response Type">
              <Response
                activeItem={endpoint.response.type}
                setActiveItem={endpoint.response.setType}
              />
            </Section>

            <Section title="Response Code">
              <ResponseCode
                responseCode={endpoint.responseCode}
                setResponseCode={endpoint.setResponseCode}
              />
            </Section>

            <Delay value={endpoint.delay} onChange={endpoint.setDelay} />
          </Segment>
        </ControlPanel>
        <div>
          <Editor mode={endpoint.response.typeForEditor} />
        </div>
      </SplitPanel>
    </ComposerCard>
  );
};

export default observer(Composer);
