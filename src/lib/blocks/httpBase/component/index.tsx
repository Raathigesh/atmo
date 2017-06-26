import * as React from "react";
import BlockFrame from "../../../components/blockFrame";
import Select from "../../../components/select";
import { EditableText } from "@blueprintjs/core";
import { css } from "glamor";
import Store from "../store/store";

interface IHttpBase {
  model: Store;
}

const HttpBase = ({ model }: IHttpBase) => {
  const editableStyle = css({
    fontSize: "22px",
    marginLeft: "10px"
  });

  const handleMethodChange = (method: string) => {
    model.updateMethod(method);
  };

  const handleUrlChange = (url: string) => {
    model.updateUrl(url);
  };

  return (
    <BlockFrame title="Http" hideMenu>
      <Select
        options={model.methods}
        selection={model.method}
        onChange={handleMethodChange}
      />
      <EditableText className={`${editableStyle}`} onChange={handleUrlChange} />
    </BlockFrame>
  );
};

export default HttpBase;
