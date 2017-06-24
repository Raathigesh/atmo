import * as React from "react";
const { default: AceEditor } = require("react-ace");

interface IJson {
  className?: string;
}

const Json = ({ className }: IJson) => {
  return (
    <AceEditor
      mode="java"
      theme="monokai"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      className={className}
      width="100%"
      height="calc(70vh)"
    />
  );
};

export default Json;
