export const prerender = false

import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit'

const eatCookie = (cookies: {
	set: (arg0: string, arg1: string, arg2: { path: string; expires: Date }) => void
}) => {
	// eat the cookie
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0)
	})

	throw redirect(302, '/')
}

export const load = (async ({ cookies }) => {
	// we only use this endpoint for the api
	// and don't need to see the page

	eatCookie(cookies)
	throw redirect(302, '/')
}) satisfies PageServerLoad

export const actions = {
	default({ cookies }) {
		eatCookie(cookies)
	}
} satisfies Actions
