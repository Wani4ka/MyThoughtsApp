import { User } from '@prisma/client'
import {Request} from 'express'
import {Session} from 'express-session'
import config from '../config'
import {APIError} from './error'
import models from './models'

export async function getUserByName(username: any) {
	if (typeof username != 'string') throw new APIError('No username', 400, {code:1})
	if (!username.match(config.usernameFormat)) throw new APIError('Bad username', 400, {code:2,username})
	return await models.user.findFirst({where: {name: username}})
}

export async function getUserById(id: number) {
	return await models.user.findFirst({ where: {id} })
}

export type AuthedRequest = Request & {
	user?: User,
	session: Session & {
		userID?: number
	}
}

export async function authUser(req: AuthedRequest, _res: any, next: (err?: any) => void) {
	try {
		if (!req.session.userID) throw new APIError('Unauthorized', 403, {code: 7})
		const user = await getUserById(req.session.userID)
		if (!user) {
			req.session.destroy(() => {})
			throw new APIError('User deleted', 403, {code: 8})
		}
		req.user = user
		next()
	} catch (err) { next(err) }
}