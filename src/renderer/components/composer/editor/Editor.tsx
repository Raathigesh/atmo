import * as React from "react";
const { default: AceEditor } = require("react-ace");

interface IJson {
  className?: string;
}

function EditorHoc(language: string) {
  return ({ className }: IJson) => {
    return (
      <AceEditor
        mode={language}
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        className={className}
        height="calc(100vh)"
        width="100%"
      />
    );
  };
}

export default EditorHoc;
