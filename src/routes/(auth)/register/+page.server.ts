export const prerender = false

import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs'

import { db } from '$lib/server/database'

export const load = (async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) { 
		throw redirect(302, '/') 
	}
}) satisfies PageServerLoad;


export const actions = {
	register: async ({ request }) => {
		const data = await request.formData()
		const username = String(data.get('username'))
		const password = String(data.get('password'))
		const email = String(data.get('email'))
		const role = String(data.get('role'))

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { invalid: true })
		}

		const user = await db.user.findUnique({
			where: { username }
		})

		if (user) {
			return fail(400, { user: true })
		}

		await db.user.create({
			data: {
				username,
				password: await bcrypt.hash(password, 10),
				userAuthToken: crypto.randomUUID(),
				email,
				role
			}
		})

		throw redirect(303, '/login')
	}
} satisfies Actions;
