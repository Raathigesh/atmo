import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import EmitModel from './EmitMode';

@observer
class Url extends Component {
  handleEventToEmitChange = (e) => {
    this.props.endpoint.setEventToEmit(e.target.value);
  }

  render() {
    return (
      <div className="ui right left icon action fluid input panelField">
        <i className="star outline icon"></i>
        <input type="text" placeholder="Event To Emit Back" value={this.props.endpoint.eventToEmit} onChange={this.handleEventToEmitChange} />
        <EmitModel endpoint={this.props.endpoint} selectedValue={this.props.endpoint.emitType}/>
      </div>
    );
  }
}

export default Url;
