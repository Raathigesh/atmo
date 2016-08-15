import React, {PropTypes} from 'react';
import AddEndpoint from './AddEndpoint';
import {observer} from 'mobx-react';
import classnames from 'classnames';

const SideBar = (props) => {
  let request = props.requests.map((request, index) => {
    return (
      <a className={classnames("item", { active: request === props.currentEndpoint }) }href="#" onClick={() => { props.setCurrentEndpoint(index) } }>
        {request.type === 'http' && <div className="ui blue label">{request.method}</div>}
        {request.type === 'http' && <span className="endpointSidebarLabel"><i className="world icon" title="Http endpoint"></i>{request.url}</span>}
        {request.type === 'socket' && <span className="endpointSidebarLabel"><i className="lightning icon" title="Socket endpoint"></i>{request.eventName}</span>}
        {request.type === 'gql' && <span className="endpointSidebarLabel"><i className="rocket icon" title="Graphql endpoint"></i>{request.url}</span>}
        {request.type === 'jsonServer' && <span className="endpointSidebarLabel"><i className="cube icon" title="Json-Server endpoint"></i>{request.url}</span>}
        {request.type === 'proxy' && <span className="endpointSidebarLabel"><i className="random icon" title="Proxy endpoint"></i>{request.url}</span>}
      </a>
    )
  });

  let url = `${window.location.protocol}//${window.location.hostname}:${props.port}${props.currentEndpoint.displayEndpoint}`;
  return (
    <div className="ui vertical fluid menu">
      <div className="item">
        <h4 className="ui header">
          <i className={`lightning ${props.status.color} icon`}></i>
          <div className="content">
            <a href={url} target="_blank">{url}</a>
            <div className="sub header">{props.status.message}</div>
          </div>
        </h4>
      </div>
      {request}
    </div>
  );
}

export default observer(SideBar);
