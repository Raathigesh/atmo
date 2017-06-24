import * as React from "react";
import { Dialog, Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";

interface ISourceView {
  children?: any;
  className?: string;
  isOpen: boolean;
  onClose?: () => {};
}

function SourceView({ children, className, isOpen, onClose }: ISourceView) {
  return (
    <Dialog
      iconName="inbox"
      isOpen={isOpen}
      title="Dialog header"
      className={className}
      onClose={onClose}
    >
      <div className="pt-dialog-body">
        {children}
      </div>
      <div className="pt-dialog-footer">
        <div className="pt-dialog-footer-actions">
          <Button intent={Intent.PRIMARY} text="Primary" />
        </div>
      </div>
    </Dialog>
  );
}

export default styled(SourceView)`
  width: calc(150vh - 100px) !important;
  height: calc(100vh - 100px) !important;
  margin-top: -200px;
`;
