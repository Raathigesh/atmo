import * as React from "react";
import { css } from "glamor";
import BlockFrame from "../../../components/blockFrame";

const Headers = () => {
  const tableStyle = css({
    width: "100%"
  });
  return (
    <BlockFrame title="Headers">
      <table className="pt-table pt-interactive" {...tableStyle}>
        <tbody>
          <tr>
            <td>Blueprint</td>
            <td>CSS framework and UI toolkit</td>
          </tr>
          <tr>
            <td>TSLint</td>
            <td>Static analysis linter for TypeScript</td>
          </tr>
          <tr>
            <td>Plottable</td>
            <td>Composable charting library built on top of D3</td>
          </tr>
        </tbody>
      </table>
    </BlockFrame>
  );
};

export default Headers;
