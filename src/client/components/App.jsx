import React, { Component, PropTypes } from 'react';
import Container from './Container';
import Header from './Header';
import SideBar from './SideBar';
import RequestPanel from './RequestPanel';
import LogPanel from './LogPanel';
import {observer} from 'mobx-react';

@observer
class App extends Component {
  render () {
    return (
      <Container>
        <div className="ui grid">
          <div className="row">
            <Header onDeploy={this.props.state.deployChanges} port={this.props.state.port} onPortChange={this.props.state.updatePort}/>
          </div>
          <div className="row hermesDashboard" style={{width: '90% !important'}}>
             <div className="three wide column">
               <SideBar
                 requests={this.props.state.endpoints}
                 createEndPoint={this.props.state.createEndPoint}
                 setCurrentEndpoint={this.props.state.setCurrentEndpoint}
               />
             </div>
             <div className="thirteen wide column">
               <RequestPanel endpoint={this.props.state.currentRequest} />
             </div>
             {/*<div className="sixteen wide column">
              <LogPanel />
            </div>*/}
           </div>           
        </div>
      </Container>
    );
  }
}

export default App;
