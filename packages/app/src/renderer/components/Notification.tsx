import * as React from "react";
import { observer } from "mobx-react";
const NotificationSystem = require("react-notification-system");

interface INotification {
  message: string;
  level: string;
}

@observer
export default class Notification extends React.Component<INotification, {}> {
  notificationSystem: any;
  style: any;

  constructor() {
    super();

    this.style = {
      NotificationItem: {
        success: {}
      }
    };
  }

  componentWillReceiveProps(nextProps: INotification) {
    if (nextProps.message !== "") {
      this.notificationSystem.addNotification({
        message: nextProps.message,
        level: nextProps.level,
        position: "bl"
      });
    }
  }

  render() {
    return (
      <NotificationSystem
        ref={e => (this.notificationSystem = e)}
        style={this.style}
      />
    );
  }
}
