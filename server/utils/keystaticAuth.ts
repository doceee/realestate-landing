import { useRuntimeConfig } from '#imports';
import { createError, getHeader, setHeader, type H3Event } from 'h3';

const PROTECTED_PREFIXES = ['/keystatic', '/api/keystatic'];

function isProtectedPath(path: string) {
	const pathname = path.split('?')[0];
	return PROTECTED_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
	);
}

function decodeBasicAuthHeader(authorization: string) {
	const [scheme, encoded] = authorization.split(' ');

	if (scheme !== 'Basic' || !encoded) {
		return null;
	}

	try {
		const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
		const separatorIndex = decoded.indexOf(':');

		if (separatorIndex === -1) {
			return null;
		}

		return {
			username: decoded.slice(0, separatorIndex),
			password: decoded.slice(separatorIndex + 1),
		};
	} catch {
		return null;
	}
}

export function assertKeystaticProductionAuth(event: H3Event) {
	if (import.meta.dev || import.meta.prerender) {
		return;
	}

	if (!isProtectedPath(event.path)) {
		return;
	}

	const config = useRuntimeConfig(event);
	const expectedUser = config.keystaticBasicAuthUser;
	const expectedPassword = config.keystaticBasicAuthPassword;

	if (!expectedUser || !expectedPassword) {
		throw createError({
			statusCode: 503,
			statusMessage: 'Keystatic protection is not configured',
			message:
				'Set KEYSTATIC_BASIC_AUTH_USER and KEYSTATIC_BASIC_AUTH_PASSWORD in production.',
		});
	}

	const authorization = getHeader(event, 'authorization');
	const credentials = authorization
		? decodeBasicAuthHeader(authorization)
		: null;

	if (
		credentials?.username === expectedUser &&
		credentials.password === expectedPassword
	) {
		return;
	}

	setHeader(event, 'WWW-Authenticate', 'Basic realm="Keystatic"');

	throw createError({
		statusCode: 401,
		statusMessage: 'Authentication required',
		message: 'Valid credentials are required to access Keystatic.',
	});
}
