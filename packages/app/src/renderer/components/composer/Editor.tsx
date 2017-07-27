import * as React from "react";
import { observer } from "mobx-react";
const { default: AceEditor } = require("react-ace");
import "brace/mode/json";
import "brace/mode/xml";
import "brace/mode/markdown";
import "brace/mode/javascript";
import "brace/theme/github";

interface IEditor {
  mode: string;
  code: string;
  onChange: (code: string) => void;
  className?: string;
}

function Editor({ className, mode, code, onChange }: IEditor) {
  return (
    <AceEditor
      mode={mode}
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      className={className}
      height="calc(100vh)"
      width="100%"
      value={code}
      onChange={onChange}
    />
  );
}

export default observer(Editor);
