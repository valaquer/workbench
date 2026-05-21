import type { Handle } from '@sveltejs/kit';
import { createSupabaseServerClient, getValidatedSession } from '$lib/supabase/server';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event);

	event.locals.getSession = async () => {
		const { session } = await getValidatedSession(event);
		return session;
	};

	event.locals.getUser = async () => {
		const { user } = await getValidatedSession(event);
		return user;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
