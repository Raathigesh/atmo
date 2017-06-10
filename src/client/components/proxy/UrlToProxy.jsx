import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

@observer
class Url extends Component {
  handleEventToEmitChange = (e) => {
    this.props.endpoint.setProxyUrl(e.target.value);
  }

  render() {
    return (
      <div className="ui right left icon fluid input">
        <i className="star outline icon"></i>
        <input type="text" placeholder="Proxy Url" value={this.props.endpoint.urlToProxy} onChange={this.handleEventToEmitChange} />
      </div>
    );
  }
}

export default Url;
