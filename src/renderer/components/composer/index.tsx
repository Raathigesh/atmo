import * as React from "react";
import Card from "../../../lib/components/card";
import HttpBase from "../../../lib/blocks/httpBase";
import Headers from "../../../lib/blocks/headers";
import Response from "../../../lib/blocks/response";
import AddBlock from "./addBlock";
import Endpoint from "../../store/Endpoint";
import { css } from "glamor";

interface IComponser {
  endpoint: Endpoint;
}

const Composer = ({ endpoint }: IComponser) => {
  const container = css({
    height: "100%"
  });

  const blocks = endpoint.blocks.map(block => {
    return <block.component store={block.store} />;
  });

  return (
    <Card style={container}>
      {blocks}
      <AddBlock />
    </Card>
  );
};

export default Composer;
