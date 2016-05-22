import React, { PropTypes } from 'react';
import Header from './ResponseHeader';

class Headers extends React.Component {
  render () {
    let headerItems = this.props.headers.map(header => {
      return <Header header={header} />
    });

    return (
      <table className="ui celled striped table">
        <tbody>
          {headerItems}
        </tbody>
      </table>
    );
  }
}

Headers.propTypes = {
  headers: PropTypes.array
}

export default Headers;
