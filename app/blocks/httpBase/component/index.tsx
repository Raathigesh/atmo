import * as React from "react";
import BlockFrame from "../../../components/blockFrame";
import Select from "../../../components/select";
import { EditableText } from "@blueprintjs/core";
import { css } from "glamor";

const HttpBase = () => {
  const editableStyle = css({
    fontSize: "22px",
    marginLeft: "10px"
  });

  return (
    <BlockFrame title="Http" hideMenu>
      <Select />
      <EditableText className={`${editableStyle}`} />
    </BlockFrame>
  );
};

export default HttpBase;
