import React, {Component, PropTypes} from 'react';

class ResponseCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseCodes: [{
          label: '100 Continue',
          value: '100'
        }, {
          label: '101 Switching Protocol',
          value: '101'
        }, {
          label: '200 OK',
          value: '200'
        }, {
          label: '201 Created',
          value: '201'
        }, {
          label: '202 Accepted',
          value: '202'
        }, {
          label: '203 Non-Authoritative Information',
          value: '203'
        }, {
          label: '204 No Content',
          value: '204'
        }, {
          label: '205 Reset Content',
          value: '205'
        }, {
          label: '206 Partial Content',
          value: '206'
        }, {
          label: '300 Multiple Choice',
          value: '300'
        }, {
          label: '301 Moved Permanently',
          value: '301'
        }, {
          label: '302 Found',
          value: '302'
        }, {
          label: '303 See Other',
          value: '303'
        }, {
          label: '304 Not Modified',
          value: '304'
        }, {
          label: '305 Use Proxy',
          value: '305'
        }, {
          label: '307 Temporary Redirect',
          value: '307'
        }, {
          label: '308 Permanent Redirect',
          value: '308'
        }, {
          label: '400 Bad Request',
          value: '400'
        }, {
          label: '401 Unauthorized',
          value: '401'
        }, {
          label: '402 Payment Required',
          value: '402'
        }, {
          label: '403 Forbidden',
          value: '403'
        }, {
          label: '404 Not Found',
          value: '404'
        }, {
          label: '405 Method Not Allowed',
          value: '405'
        }, {
          label: '406 Not Acceptable',
          value: '406'
        }, {
          label: '407 Proxy Authentication Required',
          value: '407'
        }, {
          label: '408 Request Timeout',
          value: '408'
        }, {
          label: '409 Conflict',
          value: '409'
        }, {
          label: '410 Gone',
          value: '410'
        }, {
          label: '411 Lenght Required',
          value: '411'
        }, {
          label: '412 Precondition Failed',
          value: '412'
        }, {
          label: '413 Payload Too Large',
          value: '413'
        }, {
          label: '414 URI Too Long',
          value: '414'
        }, {
          label: '415 Unsupported Media Type',
          value: '415'
        }, {
          label: '416 Requested Range Not Satisfiable',
          value: '416'
        }, {
          label: '417 Expectation Failed',
          value: '417'
        }, {
          label: '418 I\'m a teapot',
          value: '418'
        }, {
          label: '421 Misdirected Request',
          value: '421'
        }, {
          label: '426 Upgrade Required',
          value: '426'
        }, {
          label: '428 Precondition Required',
          value: '428'
        }, {
          label: '429 Too Many Requests',
          value: '429'
        }, {
          label: '431 Request Header Fields Too Large',
          value: '431'
        }, {
          label: '500 Internal Server Error',
          value: '500'
        }, {
          label: '501 Not Implemented',
          value: '501'
        }, {
          label: '502 Service Unavailable',
          value: '502'
        }, {
          label: '504 Gateway Timeout',
          value: '504'
        }, {
          label: '505 HTTP Version Not Supported',
          value: '505'
        }, {
          label: '506 Variant Also Negotiates',
          value: '506'
        }, {
          label: '507 Variant Also Negotiates',
          value: '507'
        }, {
          label: '511 Network Authentication Required',
          value: '511'
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