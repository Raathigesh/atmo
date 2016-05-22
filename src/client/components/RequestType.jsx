import React, { Component, PropTypes } from 'react';
import '../semantic/semantic';

class RequestType extends Component {
  componentDidMount() {
    $(this.refs.requestTypeDropdown).dropdown();
  }

  render () {
    return (
      <div ref="requestTypeDropdown" className="ui selection dropdown">
          <input type="hidden" name="gender"/>
          <i className="dropdown icon"></i>
          <div className="default text">Method</div>
          <div className="menu">
              <div className="item" data-value="1">GET</div>
              <div className="item" data-value="1">POST</div>
              <div className="item" data-value="1">PUT</div>
              <div className="item" data-value="1">DELETE</div>
          </div>
      </div>
    );
  }
}

export default RequestType;
