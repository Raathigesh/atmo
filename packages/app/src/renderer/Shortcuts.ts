var Mousetrap = require("mousetrap");

export default function BindShortcuts({ onNewEndpoint, onSave, onDeploy }) {
  Mousetrap.bind(["command+n", "ctrl+n"], function() {
    onNewEndpoint();
    return false;
  });

  Mousetrap.bind(["command+s", "ctrl+s"], function() {
    onSave();
    return false;
  });

  Mousetrap.bind(["command+d", "ctrl+d"], function() {
    onDeploy();
    return false;
  });
}
