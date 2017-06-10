import React, { PropTypes } from 'react';

const DocsFooter = (props) => {
  return (
    <div className="ui bottom attached grey message">
      <i className="warning icon"></i>
      {props.children}
    </div>
  );
}

export default DocsFooter;
