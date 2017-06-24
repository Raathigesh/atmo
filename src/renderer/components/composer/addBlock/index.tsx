import * as React from "react";
import {
  Button,
  Intent,
  Popover,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core";
import { css } from "glamor";

const AddBlock = () => {
  const container = css({
    width: "400px"
  });

  return (
    <Popover
      interactionKind={PopoverInteractionKind.CLICK}
      popoverClassName="pt-popover-content-sizing"
      position={Position.TOP}
    >
      <Button intent={Intent.PRIMARY} className="pt-button pt-icon-add pt-fill">
        Add block
      </Button>
      <div {...container}>
        <div className="pt-card pt-elevation-0 pt-interactive">
          <h5><a href="#">Trader Profile</a></h5>
          <p>
            Overview of employee activity, including risk model, scores and
            scenario alert history.
          </p>
        </div>
        <div className="pt-card pt-elevation-0 pt-interactive">
          <h5><a href="#">Trader Profile</a></h5>
          <p>
            Overview of employee activity, including risk model, scores and
            scenario alert history.
          </p>
        </div>
        <div className="pt-card pt-elevation-0 pt-interactive">
          <h5><a href="#">Trader Profile</a></h5>
          <p>
            Overview of employee activity, including risk model, scores and
            scenario alert history.
          </p>
        </div>
        <div className="pt-card pt-elevation-0 pt-interactive">
          <h5><a href="#">Trader Profile</a></h5>
          <p>
            Overview of employee activity, including risk model, scores and
            scenario alert history.
          </p>
        </div>
      </div>
    </Popover>
  );
};

export default AddBlock;
