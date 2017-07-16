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
                responseCode={endpoint.response.responseContent}
                setResponseCode={endpoint.response.setResponseContent}
              />
            </Section>

            <Delay value={endpoint.delay} onChange={endpoint.setDelay} />
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
