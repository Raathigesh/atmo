import * as React from "react";
import { Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react";
import Section from "../Section";
import statusOptions from "./options";

interface IResponseCode {
  responseCode: string;
  setResponseCode: (responseCode: string) => void;
}

const ResponseCode = ({ responseCode, setResponseCode }: IResponseCode) => {
  return (
    <Dropdown
      placeholder="Select Response Code"
      fluid
      search
      selection
      value={responseCode}
      onChange={(event, data) => {
        setResponseCode(data.value as string);
      }}
      options={statusOptions}
    />
  );
};

export default observer(ResponseCode);
