import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

const SideBar = (props) => {
  let request = props.requests.map((request, index) => {
    return (
      <a className="item" href="#" onClick={() => { props.setCurrentEndpoint(index) }}>
          <div className="ui blue label">{request.method}</div>
          {request.url}
      </a>
    )
  });

  return (
    <div className="ui vertical menu">
      {request}
      <div className="item">
        <div className="menu">
          <a className="item" href="#" onClick={props.createEndPoint}>
            Create Endpoint
          </a>
        </div>
      </div>
    </div>
  );
}

export default observer(SideBar);
