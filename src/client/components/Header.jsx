import React, { PropTypes } from 'react'

const Header = ({onDeploy}) => {
  return (
    <div className="ui fluid small menu hermesHeader">
      <div className="right menu">
        <div className="item" onClick={onDeploy}>
          <button className="ui button">
            <i className="icon send outline"></i>
            Deploy changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
