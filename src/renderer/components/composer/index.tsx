import * as React from "react";
import Card from "../../../lib/components/card";
import HttpBase from "../../../lib/blocks/httpBase";
import Headers from "../../../lib/blocks/headers";
import Response from "../../../lib/blocks/response";
import AddBlock from "./addBlock";
import { css } from "glamor";

const Composer = () => {
  const container = css({
    height: "100%"
  });

  return (
    <Card style={container}>
      <HttpBase />
      <Headers />
      <Response />
      <AddBlock />
    </Card>
  );
};

export default Composer;
