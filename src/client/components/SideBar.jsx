import React, {PropTypes} from 'react';
import AddEndpoint from './AddEndpoint';
import {observer} from 'mobx-react';
import classnames from 'classnames';

const SideBar = (props) => {
  let request = props.requests.map((request, index) => {
    return (
      <a className={classnames("item", {active: request === props.currentEndpoint}) }href="#" onClick={() => { props.setCurrentEndpoint(index) }}>          
          {request.type === 'http' && <div className="ui blue label">{request.method}</div>}
          {request.type === 'http' && <span className="endpointSidebarLabel"><i className="world icon"></i>{request.url}</span>}
          {request.type === 'socket' && <span className="endpointSidebarLabel"><i className="lightning icon"></i>{request.eventName}</span>}
          {request.type === 'gql' && <span className="endpointSidebarLabel"><i className="rocket icon"></i>{request.url}</span>}
          {request.type === 'jsonServer' && <span className="endpointSidebarLabel"><i className="cube icon"></i>{request.url}</span>}
      </a>
    )
  });

  return (
    <div className="ui vertical fluid menu">
      {request}
    </div>
  );
}

export default observer(SideBar);
