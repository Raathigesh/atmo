import React, { Component, PropTypes } from 'react'
import {observer} from 'mobx-react';

@observer
class Url extends Component {
  componentDidMount() {
    $(this.refs.requestTypeDropdown).dropdown();
  }

  componentDidUpdate() {
    $(this.refs.requestTypeDropdown).dropdown('set selected', this.props.endpoint.method);
  }

  handleUrlChange = (e) => {
    this.props.endpoint.setUrl(e.target.value);
  }

  handleMethodChange = (e) => {
    this.props.endpoint.setMethod(e.target.value);
  }

  render () {
      return (
        <div className="ui right action left icon fluid input">
          <i className="send outline icon"></i>
          <input type="text" placeholder="Url" value={this.props.endpoint.url} onChange={this.handleUrlChange}/>
          <select ref="requestTypeDropdown" className="ui compact selection dropdown" value={this.props.endpoint.method} onChange={this.handleMethodChange}>
             <option value="GET">GET</option>
             <option value="POST">POST</option>
             <option value="UPDATE">UPDATE</option>
           </select>
          <div type="button" className="ui blue button">Save</div>
        </div>
      );
  }
}

export default Url;
