import * as React from "react";
import styled from "styled-components";
const SplitPanel = require("react-split-pane");
import Card from "../Card";
import Url from "./Url";
import InfoBar from "../Header";
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
  baseUrl: string;
  endpoint: Endpoint;
  onUrlClick: (url: string) => void;
  setUrl: (url: string) => void;
  onDocumentation: (url: string) => void;
}

const ComposerCard = styled(Card)`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `;

const ControlPanel = styled.div`
  padding: 10px;
  background-color: #f9f9f9 !important;
  height: 100%;
`;

class Composer extends React.Component<IComponser, { width: number }> {
  constructor() {
    super();
    this.state = {
      width: 600
    };
  }

  render() {
    const { endpoint, baseUrl, onUrlClick } = this.props;
    return (
      <ComposerCard>
        <SplitPanel
          split="vertical"
          defaultSize={600}
          paneStyle={{ overflow: "auto" }}
          minSize={490}
          onChange={size => {
            this.setState({
              width: size
            });
          }}
        >
          <ControlPanel>
            <Segment basic>
              <Url
                baseUrl={baseUrl}
                url={endpoint.url}
                method={endpoint.method}
                onUrlChange={endpoint.setUrl}
                onMethodChange={endpoint.setMethod}
                onUrlClick={onUrlClick}
              />

              <Headers
                headers={endpoint.headers.headers}
                currentEndpoint={endpoint}
              />

              <Section title="Response Type">
                <Response
                  activeItem={endpoint.response.contentType}
                  setActiveItem={endpoint.changeResponseType}
                />
              </Section>

              <Section title="Response Code">
                <ResponseCode
                  responseCode={endpoint.statusCode}
                  setResponseCode={endpoint.setResponseCode}
                />
              </Section>

              <Delay value={endpoint.delay} onChange={endpoint.setDelay} />
            </Segment>
          </ControlPanel>
          <div>
            <Editor
              mode={endpoint.response.typeForEditor}
              code={endpoint.response.content}
              width={this.state.width}
              onChange={endpoint.response.setResponseContent}
              onPrettify={endpoint.response.prettifyResponse}
              onDocumentation={this.props.onDocumentation}
            />
          </div>
        </SplitPanel>
      </ComposerCard>
    );
  }
}

export default observer(Composer);
