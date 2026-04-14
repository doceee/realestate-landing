import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import {
	appendResponseHeader,
	defineEventHandler,
	getHeader,
	getRequestURL,
	readBody,
	setResponseStatus,
} from 'h3';
import keystaticConfig from '../../../keystatic.config';

const keystaticHandler = makeGenericAPIRouteHandler({
	config: keystaticConfig,
	localBaseDirectory: process.cwd(),
});

export default defineEventHandler(async (event) => {

	const response = await keystaticHandler({
		headers: {
			get(name) {
				return getHeader(event, name) ?? null;
			},
		},
		method: event.method,
		url: getRequestURL(event).href,
		json: () => readBody(event),
	});

	if (response.headers) {
		for (const [name, value] of new Headers(response.headers).entries()) {
			appendResponseHeader(event, name, value);
		}
	}

	setResponseStatus(event, response.status ?? 200, response.statusText);

	return response.body;
});
