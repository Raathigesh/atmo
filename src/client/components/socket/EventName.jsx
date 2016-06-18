import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

@observer
class EventName extends Component {
  handleEventNameChange = (e) => {
    this.props.endpoint.setEventName(e.target.value);
  }

  render() {
    return (
      <div className="ui right action left icon fluid input panelField">
        <i className="fire outline icon"></i>
        <input type="text" placeholder="Event Name" value={this.props.endpoint.eventName}  onChange={this.handleEventNameChange} />
        <div type="button" className={classnames('ui red button ', { 'disabled': this.props.totalEndpoints === 1 }) } onClick={this.props.deleteEndpoint}>Delete</div>
      </div>
    );
  }
}

export default EventName;
