import * as React from "react";
const { default: AceEditor } = require("react-ace");
import "brace/mode/json";
import "brace/theme/github";

interface IEditor {
  mode: string;
  className?: string;
}

function Editor({ className, mode }: IEditor) {
  return (
    <AceEditor
      mode={mode}
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      className={className}
      height="calc(100vh)"
      width="100%"
    />
  );
}

export default Editor;
