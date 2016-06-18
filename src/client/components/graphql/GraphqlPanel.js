import React, {Component} from 'react';
import Url from './Url';
import Response from './Response';

class SocketPanel extends Component {
  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <div className="ui segment">
              <Url endpoint={this.props.endpoint} deleteEndpoint={this.props.deleteEndpoint}/>
              <Response endpoint={this.props.endpoint} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SocketPanel;