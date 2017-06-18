import * as React from "react";
import Card from "../card";
import HttpBase from "../../blocks/httpBase";
import Headers from "../../blocks/headers";
import Response from '../../blocks/response';
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
