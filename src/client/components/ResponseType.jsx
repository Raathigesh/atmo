import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';

@observer
class ResponseType extends Component {
  componentDidMount() {
    $(this.refs.responseTypeDowndrop).dropdown();
  }

 /* componentDidUpdate() {
    $(this.refs.responseTypeDowndrop).dropdown('set selected', this.props.responseType);
  }*/
	
	changeContentType = (index) => {
		this.props.response.setContentType(this.props.responseTypes[index]);
	}
	
	handleContentTypeChange = () => {
		this.props.response.setContentType(this.props.responseTypes[this.props.responseTypes.length - 1]);
	}
  
	render() {
		let items = this.props.responseTypes.map((reponseType, index) => {
			 	let className = 'item';
				
				if (reponseType.type === this.props.contentType.type) {
					className += ' active selected';
				} 
				
				return <div className={className} onClick={() => {this.changeContentType(index)}}>{reponseType.type}</div>
		});

		return (
			<div  className="ui fluid right action left icon input">
				<i className="reply icon"></i>
				<input type="text" placeholder="Content type" value={this.props.contentType.contentType} disabled/>
				<div ref="responseTypeDowndrop" className="ui basic floating dropdown button">
					<div className="text">{this.props.contentType.type}</div>
					<i className="dropdown icon"></i>
					<div className="menu">
						{items}
					</div>
				</div>
			</div>
		);
	}
}

ResponseType.propTypes = {
	responseTypes: PropTypes.array,
	contentType: PropTypes.obj,
	response: PropTypes.obj
}

ResponseType.defaultProps  = {
	responseTypes: []
}

export default ResponseType;