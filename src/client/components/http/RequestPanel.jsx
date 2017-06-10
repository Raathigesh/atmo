import React, { PropTypes } from 'react';
import Url from './Url';
import ResponseHeaders from './ResponseHeaders';
import ResponseType from './ResponseType';
import Response from './Response';
import {observer} from 'mobx-react';
import DocsFooter from '../DocsFooter';

const Request = ({endpoint, responseTypes, deleteEndpoint, totalEndpoints}) => {
  return (
    <div className="ui grid">
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui top attached segment">
            <Url endpoint={endpoint} deleteEndpoint={deleteEndpoint} totalEndpoints={totalEndpoints}/>
            <ResponseHeaders endpoint={endpoint}/>
            <ResponseType responseTypes={responseTypes} response={endpoint.response} contentType={endpoint.response.contentType}/>
            <Response endpoint={endpoint}/>
          </div>
          <DocsFooter>
            Configure your http endpoint here.
          </DocsFooter>
        </div>
      </div>
    </div>
  )
}

export default observer(Request);
