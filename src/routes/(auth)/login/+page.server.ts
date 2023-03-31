export const prerender = false

import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcryptjs'
import { db } from '$lib/server/database'
import { MAX_AGE } from '$env/static/private'

export const load = (async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/')
	}
}) satisfies PageServerLoad

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData()
		const username = data.get('username')
		const password = data.get('password')

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { invalid: true })
		}

		const user = await db.user.findUnique({ where: { username } })

		if (!user) {
			return fail(400, { credentials: true })
		}

		const userPassword = await bcrypt.compare(password, user.password)

		if (!userPassword) {
			return fail(400, { credentials: true })
		}

		// generate new auth token just in case
		const authenticatedUser = await db.user.update({
			where: { username: user.username },
			data: { userAuthToken: crypto.randomUUID() }
		})

		cookies.set('session', authenticatedUser.userAuthToken, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			// secure: process.env.NODE_ENV === 'production',
			secure: import.meta.env.MODE === 'production',
			// set cookie to expire after a month
			maxAge: Number(MAX_AGE)
		})

		// redirect the user
		throw redirect(302, '/')
	}
} satisfies Actions
