import React, { Component, PropTypes } from 'react';
import Container from './Container';
import Header from './Header';
import SideBar from './SideBar';
import HttpRequestPanel from './http/RequestPanel';
import SocketPanel from './socket/SocketPanel';
import GraphqlPanel from './graphql/GraphqlPanel';
import JsonServerPanel from './jsonServer/jsonServerPanel';
import LogPanel from './LogPanel';
import {observer} from 'mobx-react';
import Status from './Status';
import ProxyPanel from './proxy/ProxyPanel';
import Notification from './Notification';
import '../semantic/semantic';


@observer
class App extends Component {
  render() {
    return (
      <Container>
        <div className="ui grid">
          <div className="row">
            <Header
              onDeploy={this.props.state.deployChanges}
              port={this.props.state.port}
              state={this.props.state}
              initialize={this.props.state.initialize}
              save={this.props.state.saveChanges}
              createEndPoint={this.props.state.createEndPoint}
              createSocketEndpoint={this.props.state.createSocketEndpoint}
              createGraphqlEndpoint={this.props.state.createGraphqlEndpoint}
              createJsonServerEndpoint={this.props.state.createJsonServerEndpoint}
              generateProject={this.props.state.generateProject}
              generators={this.props.state.generators}
              installGenerator={this.props.state.installGenerator}
              createProxyEndpoint={this.props.state.createProxyEndpoint}
              stars={this.props.state.stars}
              />
          </div>
          <div className="row hermesDashboard" style={{ width: '90% !important' }}>
            <div className="four wide column">
              <SideBar
                currentEndpoint={this.props.state.currentRequest}
                requests={this.props.state.endpoints}
                setCurrentEndpoint={this.props.state.setCurrentEndpoint}
                status={this.props.state.status}
                port={this.props.state.port}
                />
            </div>
            <div className="twelve wide column">
              {this.props.state.currentRequest.type === 'http' && <HttpRequestPanel
                endpoint={this.props.state.currentRequest}
                responseTypes={this.props.state.responseTypes}
                deleteEndpoint={this.props.state.deleteEndpoint}
                totalEndpoints={this.props.state.totalEndpoints}/>}
              {this.props.state.currentRequest.type === 'socket' && <SocketPanel endpoint={this.props.state.currentRequest} deleteEndpoint={this.props.state.deleteEndpoint}/>}
              {this.props.state.currentRequest.type === 'gql' && <GraphqlPanel endpoint={this.props.state.currentRequest} deleteEndpoint={this.props.state.deleteEndpoint}/>}
              {this.props.state.currentRequest.type === 'jsonServer' && <JsonServerPanel endpoint={this.props.state.currentRequest} deleteEndpoint={this.props.state.deleteEndpoint} syncJsonServer={this.props.state.syncJsonServer}/>}
              {this.props.state.currentRequest.type === 'proxy' && <ProxyPanel endpoint={this.props.state.currentRequest} deleteEndpoint={this.props.state.deleteEndpoint}/>}
            </div>
          </div>
          <Notification msg={this.props.state.msg}/>
        </div>
      </Container>
    );
  }
}

export default App;
