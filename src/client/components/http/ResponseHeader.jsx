import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

@observer
class Header extends Component {
  handleKeyChange = (e) => {
    this.props.header.setKey(e.target.value);
  }

  handleValueChange = (e) => {
    this.props.header.setValue(e.target.value);
  }

  handleTextBoxClick = () => {
    if (this.props.isLastHeader) {
      this.props.onLastHeaderHighlight();
    }
  }

  handleRemoveHeaderClick = () => {
    this.props.onRemoveEndpoint(this.props.index);
  }

  render() {
    return (
      <tr>
        <td className="six wide">
          <div className="ui fluid transparent input">
            <input type="text" placeholder="Key" value={this.props.header.key} onChange={this.handleKeyChange} onClick={this.handleTextBoxClick}/>
          </div>
        </td>
        <td className="six wide">
          <div className="ui fluid transparent input">
            <input type="text" placeholder="Value" value={this.props.header.value} onChange={this.handleValueChange} onClick={this.handleTextBoxClick}/>
          </div>
        </td>
        {this.props.showClose && <td  className="one wide center aligned" onClick={this.handleRemoveHeaderClick}>
          <i className="close link icon"></i>
        </td>}
      </tr>
    );
  }
}

Header.propTypes = {
  headerKey: PropTypes.string,
  value: PropTypes.string
}

export default Header;
