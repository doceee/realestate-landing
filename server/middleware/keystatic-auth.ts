import { defineEventHandler } from 'h3';
import { assertKeystaticProductionAuth } from '../utils/keystaticAuth';

export default defineEventHandler((event) => {
	assertKeystaticProductionAuth(event);
});
