import ContentType from './ContentType';

const responseTypse = [
	new ContentType('json', 'application/json'),
	new ContentType('html', 'application/html'),
	new ContentType('txt', 'application/txt'),
	new ContentType('none', '')
];

export default responseTypse;