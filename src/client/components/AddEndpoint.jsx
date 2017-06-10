import React, {Component} from 'react';

class AddEndpoint extends Component {
  componentDidMount = () => {
    $(this.refs.createEndpointDropdown).dropdown();
  }

  render() {
    return (
      <div className="ui inverted blue buttons">
        <div className="ui button" onClick={this.props.onClick}>
          New Http Endpoint
        </div>
        <div  ref="createEndpointDropdown" className="ui floating dropdown icon button">
          <i className="dropdown icon"></i>
          <div className="menu">
            <div className="item" data-value="drop" onClick={this.props.onCreateSocketEndpoint}>New Socket Event</div>            
            <div className="item" data-value="horizontal flip" onClick={this.props.createJsonServerEndpoint}>New Json Server Endpoint</div>
            <div className="item" data-value="horizontal flip" onClick={this.props.createProxyEndpoint}>New Proxy Endpoint</div>
            <div className="item" data-value="horizontal flip" onClick={this.props.createGraphqlEndpoint}>New GraphQL Endpoint</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEndpoint;