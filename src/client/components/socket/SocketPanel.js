import React, {Component} from 'react';
import EventName from './EventName';
import EventToEmit from './EventToEmit';
import Response from './Response';

class SocketPanel extends Component {
	render() {
		return (
			 <div className="ui grid">
				<div className="row">
					<div className="sixteen wide column">
						<EventName endpoint={this.props.endpoint} deleteEndpoint={this.props.deleteEndpoint}/>
						<EventToEmit endpoint={this.props.endpoint} />
						<Response endpoint={this.props.endpoint} />
					</div>
				</div>
			</div>
		);
	}
}

export default SocketPanel;