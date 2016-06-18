import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import ResponseCode from './ResponseCode';

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

  handleResponseCodeChange = (code) => {
    this.props.endpoint.response.setResponseCode(code);
  }

  render() {
    return (
      <div className="field">
        <div className="ui right action left icon fluid input">
          <i className="send outline icon"></i>
          <input type="text" placeholder="Url" value={this.props.endpoint.url} onChange={this.handleUrlChange}/>
          <select ref="requestTypeDropdown" className="ui compact selection dropdown endpointTypeDropdown" value={this.props.endpoint.method} onChange={this.handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="COPY">COPY</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
            <option value="PURGE">PURGE</option>
            <option value="LOCK">LOCK</option>
            <option value="UNLOCK">UNLOCK</option>
          </select>
          <ResponseCode selectedValue={this.props.endpoint.response.responseCode} onChange={this.handleResponseCodeChange}/>
          <div type="button" className={classnames('ui red button ', { 'disabled': this.props.totalEndpoints === 1 }) } onClick={this.props.deleteEndpoint}>Delete</div>
        </div>
      </div>
    );
  }
}

export default Url;
