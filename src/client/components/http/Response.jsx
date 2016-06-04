import React, { PropTypes } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/theme/tomorrow';

class Response extends React.Component {
  handleChange = (response) => {
    this.props.endpoint.setResponse(response);
  }
  
  getMode = () => {
    let mode = '';
    let contentType = this.props.endpoint.response.contentType.type;
    
    if (contentType === 'json') {
      mode = 'json';
    } else if (contentType === 'html') {
      mode = 'html';
    }
    
    return mode;
  }

  render () {
      return (
        <div>
          <AceEditor
            mode={this.getMode()}
            theme="tomorrow"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            width="100%"
            onChange={this.handleChange}
            value={this.props.endpoint.response.content}
          />
        </div>
      )
  }
}

export default Response;
