import * as React from "react";
import styled from "styled-components";
const brace = require("brace");
import "brace/mode/java";
import "brace/theme/monokai";

import Editor from "./Editor";

const Response = () => {
  const JsonPanel = Editor("javascript");
  const XmlPanel = Editor("xml");
  const TextPanel = Editor("text");
  const ScriptPanel = Editor("javascript");

  return <JsonPanel />;
};

export default Response;
