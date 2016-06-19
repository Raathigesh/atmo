import React, {Component} from 'react';
import Url from './Url';
import Json from './Json';
import DocsFooter from '../DocsFooter';
import {observer} from 'mobx-react';

@observer
class JsonServerPanel extends Component {
  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <div className="ui  top attached segment">
              <Url endpoint={this.props.endpoint} deleteEndpoint={this.props.deleteEndpoint} syncJsonServer={this.props.syncJsonServer}/>
              <Json endpoint={this.props.endpoint} />
            </div>
            <DocsFooter>
              Refer the <a href='https://github.com/Raathigesh/Atmo/blob/master/docs/JsonServerEndpoint.md'>docs on how to create a Json-server endpoint.</a>
            </DocsFooter>
          </div>
        </div>
      </div>
    );
  }
}

export default JsonServerPanel;