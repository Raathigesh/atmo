import * as React from 'react';
import {Tab2, Tabs2} from '@blueprintjs/core';
const brace = require('brace');
import 'brace/mode/java';
import 'brace/theme/github';

import BlockFrame from "../../../components/blockFrame";
import Json from './panels/Json';

const Response = () => {
	return (
		<BlockFrame title="Response">
			<Tabs2 id="reponseTabs" onChange={this.handleTabChange}>
				<Tab2 id="json" title="Json" panel={<Json />} />
				<Tab2 id="xml" title="Xml" panel={<Json />} />
				<Tab2 id="text" title="Text" panel={<Json />} />
			</Tabs2>
		</BlockFrame>
	);
};

export default Response;
