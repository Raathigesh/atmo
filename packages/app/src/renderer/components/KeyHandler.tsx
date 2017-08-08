import * as React from "react";
import { HotKeys } from "react-hotkeys";

interface IKeyHandler {
  onEndpoint: () => void;
  onDeploy: () => void;
  onSave: () => void;
  children: any;
}

export default function KeyHandler({
  onEndpoint,
  onDeploy,
  onSave,
  children
}: IKeyHandler) {
  const keyMap = {
    newEndpoint: "ctrl+e",
    deploy: "ctrl+d",
    save: "ctrl+s"
  };

  const handlers = {
    deploy: onDeploy,
    save: onSave,
    newEndpoint: onEndpoint
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {children}
    </HotKeys>
  );
}
