import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';
import type { Session, User } from '@supabase/supabase-js';

export function createSupabaseServerClient(event: RequestEvent) {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) => {
				cookies.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});
}

export async function getValidatedSession(
	event: RequestEvent
): Promise<{ session: Session | null; user: User | null }> {
	const supabase = event.locals.supabase;

	const { data: claims, error: claimsError } = await supabase.auth.getClaims();

	if (claimsError || !claims?.claims) {
		return { session: null, user: null };
	}

	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	if (sessionError || !session) {
		return { session: null, user: null };
	}

	return {
		session,
		user: session.user
	};
}
