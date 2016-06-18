import React, { PropTypes } from 'react';
import 'semantic-ui-css/semantic.css';
import '../style/dashboard.css';

const Container = (props) => {
  return (
    <div className="ui fluid container">
      {props.children}
    </div>
  );
}

export default Container;
