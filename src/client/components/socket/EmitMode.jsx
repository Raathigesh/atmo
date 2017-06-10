import React, {Component, PropTypes} from 'react';

class ResponseCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emitModes: [{
        label: 'Emit to all connections',
        value: 'all'
      }, {
        label: 'Emit only to current connection',
        value: 'self'
      }, {
        label: 'Emit to all but not to the current',
        value: 'broadcast'
      }]
    }
  }
  componentDidMount() {
    $(this.refs.emitMode).dropdown();
  }

  handleOnChange = (value) => {
    this.props.endpoint.setEmitType(value);
  }

  getLabel = (value) => {
    for (let code of this.state.emitModes) {
      if (code.value === value) {
        return code.label;
      }
    }
  }

  getCode = () => {
    return this.props.selectedValue;
  }

  render() {
    let items = this.state.emitModes.map((emitMode) => {
      return (<div className="item" onClick={() => { this.handleOnChange(emitMode.value) } }>
        {emitMode.label}
      </div>);
    });

    return (
      <div ref="emitMode" className="ui floating blue labeled icon dropdown button">
        <i className="wizard icon"></i>
        <span className="text">{this.getLabel(this.props.selectedValue) }</span>
        <div className="menu">
          <div className="header">
            <i className="tags icon"></i>
            Emit to
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