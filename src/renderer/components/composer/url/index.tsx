import * as React from "react";
import Select from "../../../components/select";
import { Dropdown, Input } from "semantic-ui-react";
import styled from "styled-components";

interface IHttpBase {}

const options = [
  { key: "get", text: "GET", value: "get" },
  { key: "post", text: "POST", value: "post" },
  { key: "put", text: "PUT", value: "put" },
  { key: "patch", text: "PATCH", value: "patch" },
  { key: "delete", text: "DELETE", value: "delete" }
];

const HttpBase = ({  }: IHttpBase) => {
  return (
    <Input
      action={
        <Dropdown button basic floating options={options} defaultValue="get" />
      }
      fluid
      icon="lightning"
      iconPosition="left"
      placeholder="Your url goes here"
    />
  );
};

export default HttpBase;
