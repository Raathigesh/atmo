import *as React from 'react';
const {default: AceEditor} = require('react-ace');

const Json = () => {
	return (
		<AceEditor
			mode="java"
			theme="github"
			name="UNIQUE_ID_OF_DIV"
			editorProps={{$blockScrolling: true}}
			width= "100%"
		/>
	);
};

export default Json;
