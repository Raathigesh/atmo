import * as React from "react";
import { Dropdown } from "semantic-ui-react";
import Section from "../section";
import statusOptions from "./options";

const ResponseCode = () => {
  return (
    <Dropdown
      placeholder="Select Country"
      fluid
      search
      selection
      options={statusOptions}
    />
  );
};

export default ResponseCode;
