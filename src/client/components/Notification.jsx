import React, {Component, PropTypes} from 'react';
import ReactNotification from 'react-notification-system';

class Notification extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.msg !== nextProps.msg && nextProps.msg !== '') {
      this.refs.notifications.addNotification({
        title: 'Atmo',
        message: nextProps.msg,
        level: 'success'
      });
    }
  }

  render() {
    return <ReactNotification ref="notifications" />
  }
}

Notification.propTypes = {
  msg: PropTypes.obj
}

export default Notification;