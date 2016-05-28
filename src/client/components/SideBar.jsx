import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

const SideBar = (props) => {
  let request = props.requests.map((request, index) => {
    return (
      <a className={classnames("item", {active: request === props.currentEndpoint}) }href="#" onClick={() => { props.setCurrentEndpoint(index) }}>
          <div className="ui blue label">{request.method}</div>
          <span className="endpointSidebarLabel">{request.url}</span>
      </a>
    )
  });

  return (
    <div className="ui vertical fluid menu">
      {request}
      <div className="item">
        <div className="menu">
          <a className="item" href="#" onClick={props.createEndPoint}>
               <i className="plus icon"></i>Create Endpoint
          </a>
        </div>
      </div>
    </div>
  );
}

export default observer(SideBar);
