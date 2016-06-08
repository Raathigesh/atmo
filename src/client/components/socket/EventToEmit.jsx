import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

@observer
class Url extends Component {
  handleEventToEmitChange = (e) => {
    this.props.endpoint.setEventToEmit(e.target.value);
  }

  render () {
      return (
        <div className="ui right action left icon fluid input">
          <i className="star outline icon"></i>
          <input type="text" placeholder="Event To Emit Back" value={this.props.endpoint.eventToEmit} onChange={this.handleEventToEmitChange} />
        </div>
      );
  }
}

export default Url;
