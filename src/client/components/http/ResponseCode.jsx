import React, {Component, PropTypes} from 'react';

class ResponseCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseCodes: [{
        label: '200 OK',
        value: '200'
      }, {
          label: '201 Created',
          value: '201'
        }, {
          label: '204 No Content',
          value: '204'
        }, {
          label: '304 Not Modified',
          value: '304'
        }, {
          label: '400 Bad Request',
          value: '400'
        }, {
          label: '401 Unauthorized',
          value: '401'
        }, {
          label: '403 Forbidden',
          value: '403'
        }, {
          label: '404 Not Found',
          value: '404'
        }, {
          label: '500 Internal Server Error',
          value: '500'
        }]
    }
  }
  componentDidMount() {
    $(this.refs.responseCodeDropdown).dropdown();
  }

  handleOnChange = (value) => {
    this.props.onChange(value);
  }

  getLabel = (value) => {
    for (let code of this.state.responseCodes) {
      if (code.value === value) {
        return code.label;
      }
    }
  }

  getCode = () => {
    return this.props.selectedValue;
  }

  render() {
    let items = this.state.responseCodes.map((responseCode) => {
      return (<div className="item" onClick={() => { this.handleOnChange(responseCode.value) } }>
        {responseCode.label}
      </div>);
    }); 
 
    return (
      <div ref="responseCodeDropdown" className="ui floating blue labeled icon dropdown button">
        <i className="wizard icon"></i>
        <span className="text">{this.getLabel(this.props.selectedValue) }</span>
        <div className="menu">
          <div className="header">
            <i className="tags icon"></i>
            Response Code
          </div>
          <div className="divider"></div>
          {items}
        </div>
      </div>
    );
  }
}

ResponseCode.propTypes = {
  responseCode: PropTypes.string
}

export default ResponseCode;