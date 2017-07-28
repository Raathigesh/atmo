import * as React from "react";
import Section from "./Section";
import Select from "../../components/Select";
import { Dropdown, Input, Icon, Header } from "semantic-ui-react";
import styled from "styled-components";
import { observer } from "mobx-react";

interface IHttpBase {
  url: string;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: string) => void;
}

const LinkIcon = styled(Icon)`
  color: #ff6a4d !important;
`;

const options = [
  { key: "get", text: "GET", value: "get" },
  { key: "post", text: "POST", value: "post" },
  { key: "put", text: "PUT", value: "put" },
  { key: "patch", text: "PATCH", value: "patch" },
  { key: "delete", text: "DELETE", value: "delete" }
];

const PreviewUrl = ({ url }: { url: string }) => {
  return (
    <Header as="h5" floated="right" onClick={() => {}}>
      <a href={url} target="_blank">
        {url}
      </a>
    </Header>
  );
};

const HttpBase = ({ url, onUrlChange, onMethodChange }: IHttpBase) => {
  return (
    <Section title="Url" headerComponents={<PreviewUrl url={url} />}>
      <Input
        defaultValue={url}
        action={
          <Dropdown
            button
            basic
            floating
            options={options}
            defaultValue="get"
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

export default observer(HttpBase);
