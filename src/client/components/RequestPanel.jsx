import React, { PropTypes } from 'react';
import Url from './Url';
import RequestType from './RequestType';
import ResponseHeaders from './ResponseHeaders';
import Response from './Response';

const Request = ({endpoint}) => {
  return (
    <div className="ui grid">
      <div className="row">
         <div className="sixteen wide column">
            <Url endpoint={endpoint} />
            <ResponseHeaders headers={endpoint.headers}/>
            <Response endpoint={endpoint}/>
         </div>
       </div>
    </div>
  )
}

export default Request
