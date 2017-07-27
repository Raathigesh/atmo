import * as React from "react";
import { observer } from "mobx-react";
const NotificationSystem = require("react-notification-system");

interface INotification {
  notification: {
    message: string;
    level: string;
  };
}

@observer
export default class Notification extends React.Component<INotification, {}> {
  notificationSystem: any;
  componentDidMount() {}
  componentDidUpdate(nextProps: INotification) {
    debugger;
    this.notificationSystem.addNotification(nextProps.notification);
  }

  render() {
    return <NotificationSystem ref={e => (this.notificationSystem = e)} />;
  }
}
