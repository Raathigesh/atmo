import * as React from "react";
import Select from "../../components/Select";
import { Dropdown, Input } from "semantic-ui-react";
import styled from "styled-components";

interface IHttpBase {
  url: string;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: string) => void;
}

const options = [
  { key: "get", text: "GET", value: "get" },
  { key: "post", text: "POST", value: "post" },
  { key: "put", text: "PUT", value: "put" },
  { key: "patch", text: "PATCH", value: "patch" },
  { key: "delete", text: "DELETE", value: "delete" }
];

const HttpBase = ({ url, onUrlChange, onMethodChange }: IHttpBase) => {
  return (
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
      icon="lightning"
      iconPosition="left"
      placeholder="Your url goes here"
      onChange={event => onUrlChange((event.target as any).value)}
    />
  );
};

export default HttpBase;
