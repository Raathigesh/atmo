import React, {Component, PropTypes} from 'react';
import responseCodes from '../../stores/httpStatusCodes';

class ResponseCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseCodes: responseCodes
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
        return `${code.value} ${code.label}`;
      }
    }
  }

  getCode = () => {
    return this.props.selectedValue;
  }

  render() {
    let items = this.state.responseCodes.map((responseCode) => {
      return (<div className="item" onClick={() => { this.handleOnChange(responseCode.value) } }>
        {`${responseCode.value} ${responseCode.label}`}
      </div>);
    });

    return (
      <div ref="responseCodeDropdown" className="ui floating blue labeled icon dropdown button">
        <i className="wizard icon"></i>
        <span className="text">{this.getLabel(this.props.selectedValue) }</span>
        <div className="menu">
          <div className="ui icon search input">
            <i className="search icon"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="divider"></div>
          <div className="header">
            <i className="tags icon"></i>
            Response Code
          </div>
          <div className="scrolling menu">
            {items}
          </div>
        </div>
      </div>
    );
  }
}

ResponseCode.propTypes = {
  responseCode: PropTypes.string
}

export default ResponseCode;