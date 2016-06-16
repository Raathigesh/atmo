import React, {Component} from 'react';
import Url from './Url';
import Json from './Json';

class JsonServerPanel extends Component {
	render() {
		return (
			 <div className="ui grid">
				<div className="row">
					<div className="sixteen wide column">
						<Url endpoint={this.props.endpoint} deleteEndpoint={this.props.deleteEndpoint}/>
						<Json endpoint={this.props.endpoint} />
					</div>
				</div>
			</div>
		);
	}
}

export default JsonServerPanel;