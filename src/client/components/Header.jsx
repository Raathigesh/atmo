import React, { PropTypes } from 'react'

const Header = ({onDeploy, onPortChange, port}) => {
  return (
    <div className="ui fluid small menu hermesHeader">
      <div className="right menu">
        <div className="item">
          <div className="ui left icon input">
            <input type="text" placeholder="Port (Default is 5000)" value={port} onChange={(e) => {onPortChange(e.target.value)}}/>
            <i className="plug icon"></i>
          </div>
        </div>
        <div className="item" onClick={onDeploy}>
          <button className="ui button">
            <i className="icon send outline"></i>
            Deploy
          </button>
        </div>
        <div className="item">
          <div className="ui inverted transparent left icon input">
            <input type="text" value={`http://localhost:${port}`} readonly/>
            <i className="lightning icon"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
