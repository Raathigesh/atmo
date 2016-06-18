import React, { PropTypes } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/theme/tomorrow';

class Response extends React.Component {
  handleChange = (response) => {
    this.props.endpoint.setPayload(response);
  }

  render() {
    return (
      <div>
        <AceEditor
          mode='json'
          theme="tomorrow"
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          onChange={this.handleChange}
          value={this.props.endpoint.payload}
          fontSize={14}
          height="400px"
          />
      </div>
    )
  }
}

export default Response;
