import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import Header from './ResponseHeader';

@observer
class Headers extends Component {
  handleLastEndpointHeight = () => {
    this.props.endpoint.addEmptyHeader();
  }

  onRemoveEndpoint = (index) => {
    this.props.endpoint.removeHeader(index);
  }

  render() {
    let headerItems = this.props.endpoint.headers.map((header, index) => {
      return <Header
        onLastHeaderHighlight={this.handleLastEndpointHeight}
        header={header}
        isLastHeader={index === this.props.endpoint.headers.length - 1}
        index={index}
        onRemoveEndpoint={this.onRemoveEndpoint}
        showClose = {this.props.endpoint.headers.length > 1}
        />
    });

    return (
      <table className="ui celled striped table">
       <thead>
          <tr>
            <th colSpan="3">
              Response Headers
            </th>
          </tr>
        </thead>
        <tbody>
          {headerItems}
        </tbody>
      </table>
    );
  }
}

Headers.propTypes = {
  headers: PropTypes.array
}

export default Headers;
