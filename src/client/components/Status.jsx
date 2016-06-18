import React, {Component, PropTypes} from 'react';

class Status extends Component {
  render() {
    return (
      <div className={`ui icon small ${this.props.status.color} message`}>
        <i className={`${this.props.status.icon} icon`}></i>
        <div className="content">
          <div className="header">
            {this.props.status.message}
          </div>
        </div>
        {this.props.status.miniMessage !== '' && <a className={`ui ${this.props.status.color} basic label`}>
          {this.props.status.miniMessage}
        </a> }
      </div>
    );
  }
}

Status.propTypes = {
  status: PropTypes.obj
}

export default Status;