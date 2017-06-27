import * as React from "react";
import BlockFrame from "../../../components/blockFrame";
import Select from "../../../components/select";
import { EditableText } from "@blueprintjs/core";
import { css } from "glamor";
import Store from "../store/store";

interface IHttpBase {
  store: Store;
}

const HttpBase = ({ store }: IHttpBase) => {
  const editableStyle = css({
    fontSize: "22px",
    marginLeft: "10px"
  });

  const handleMethodChange = (method: string) => {
    store.updateMethod(method);
  };

  const handleUrlChange = (url: string) => {
    store.updateUrl(url);
  };

  return (
    <BlockFrame title="Http" hideMenu>
      <Select
        options={store.methods}
        selection={store.method}
        onChange={handleMethodChange}
      />
      <EditableText className={`${editableStyle}`} onChange={handleUrlChange} />
    </BlockFrame>
  );
};

export default HttpBase;
