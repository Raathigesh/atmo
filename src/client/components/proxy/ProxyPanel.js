import React, {Component} from 'react';
import Url from './Url';
import UrlToProxy from './UrlToProxy';
import DocsFooter from '../DocsFooter';

class SocketPanel extends Component {
  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <div className="ui top attached segment">
              <Url endpoint={this.props.endpoint} deleteEndpoint={this.props.deleteEndpoint}/>
              <UrlToProxy endpoint={this.props.endpoint} />
            </div>
            <DocsFooter>
              Refer the <a href='https://github.com/Raathigesh/Atmo/blob/master/docs/ProxyEndpoint.md'>docs on how to create a http proxy endpoint.</a>
            </DocsFooter>
          </div>
        </div>
      </div>
    );
  }
}

export default SocketPanel;