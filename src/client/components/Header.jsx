import React, { PropTypes } from 'react'

const Header = ({onDeploy}) => {
  return (
    <div className="ui fluid small menu hermesHeader">
      <div className="right menu">
        <div className="item">
          <div className="ui left icon input">
            <input type="text" placeholder="Port (Default is 5000)" />
            <i className="plug icon"></i>
          </div>
        </div>
        <div className="item" onClick={onDeploy}>
          <button className="ui button">
            <i className="icon send outline"></i>
            Deploy changes
          </button>
        </div>
        <div className="item">
          <div className="ui inverted transparent left icon input">
            <input type="text" value="http://localhost:5000" readonly/>
            <i className="lightning icon"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
