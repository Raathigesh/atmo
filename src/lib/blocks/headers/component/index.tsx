import * as React from "react";
import { css } from "glamor";
import BlockFrame from "../../../components/blockFrame";
import HeaderRow from './headerRow';

const Headers = () => {
  const tableStyle = css({
    width: "100%"
  });
  return (
    <BlockFrame title="Headers">
      <table className="pt-table pt-interactive" {...tableStyle}>
        <tbody>
          <HeaderRow />
          <HeaderRow />
          <HeaderRow />
        </tbody>
      </table>
    </BlockFrame>
  );
};

export default Headers;
