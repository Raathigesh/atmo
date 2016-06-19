import React, {Component} from 'react';
import EventName from './EventName';
import EventToEmit from './EventToEmit';
import Response from './Response';
import DocsFooter from '../DocsFooter';

class SocketPanel extends Component {
  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <div className="ui top attached segment">
              <EventName endpoint={this.props.endpoint} deleteEndpoint={this.props.deleteEndpoint}/>
              <EventToEmit endpoint={this.props.endpoint} />
              <Response endpoint={this.props.endpoint} />
            </div>
            <DocsFooter>
              Refer the <a href='https://github.com/Raathigesh/Atmo/blob/master/docs/SocketEndpoint.md'>docs on how to create a socket endpoint.</a>
            </DocsFooter>
          </div>
        </div>
      </div>
    );
  }
}

export default SocketPanel;