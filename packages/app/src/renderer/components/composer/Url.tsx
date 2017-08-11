import * as React from "react";
import Section from "./Section";
import Select from "../../components/Select";
import { Dropdown, Input, Icon, Header } from "semantic-ui-react";
import styled from "styled-components";
import { observer } from "mobx-react";

interface IUrl {
  baseUrl: string;
  url: string;
  method: string;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: string) => void;
  onUrlClick: (url: string) => void;
}

const LinkIcon = styled(Icon)`
  color: #ff6a4d !important;
`;

const options = [
  { key: "get", text: "GET", value: "get" },
  { key: "post", text: "POST", value: "post" },
  { key: "put", text: "PUT", value: "put" },
  { key: "patch", text: "PATCH", value: "patch" },
  { key: "delete", text: "DELETE", value: "delete" },
  { key: "options", text: "OPTIONS", value: "options" }
];

const PreviewUrl = ({
  url,
  onUrlClick
}: {
  url: string;
  onUrlClick: (url: string) => void;
}) => {
  return (
    <Header
      as="h5"
      floated="right"
      onClick={(event: any) => {
        event.preventDefault();
        onUrlClick(url);
      }}
    >
      <a href={url} target="_blank">
        {url}
      </a>
    </Header>
  );
};

const Url = ({
  url,
  baseUrl,
  method,
  onUrlChange,
  onMethodChange,
  onUrlClick
}: IUrl) => {
  return (
    <Section
      title="Url"
      headerComponents={
        <PreviewUrl url={`${baseUrl}${url}`} onUrlClick={onUrlClick} />
      }
    >
      <Input
        value={url}
        action={
          <Dropdown
            button
            basic
            floating
            options={options}
            value={method}
            onChange={(event, data) => onMethodChange(data.value as string)}
          />
        }
        fluid
        icon={<LinkIcon name="send outline" link />}
        iconPosition="left"
        placeholder="Your url goes here"
        onChange={event => onUrlChange((event.target as any).value)}
      />
    </Section>
  );
};

export default observer(Url);
