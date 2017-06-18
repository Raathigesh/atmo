import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./home";
import "@blueprintjs/core/dist/blueprint.css";

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById("root")
);

if ((module as any).hot) {
  (module as any).hot.accept("./home", () => {
    const NextRoot = require("./home"); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot history={history} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
