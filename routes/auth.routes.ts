import {Router} from 'express'
import {AuthedRequest, authUser, getUserByName} from '../core/user'
import config from '../config'
import {APIError} from '../core/error'

import bcrypt from 'bcryptjs'
import models from '../core/models'

const router = Router()

router.get('/whoami', authUser, (req: AuthedRequest, res) => {
    const user = req.user
    res.json({ id: user!.id, name: user!.name })
})

router.post('/register', async (req: AuthedRequest, res, next) => {
    try {
        const { username, password, invite } = req.body
        if (invite !== config.invite) throw new APIError('Invalid invite', 400, { code: 9 })
        if (typeof password != 'string') throw new APIError('No password', 400, {code:10})
        if (password.length < 6 || password.length > 32) throw new APIError('Password is too short or too long', 400, {code:11})

        const candidate = await getUserByName(username)
        if (candidate) throw new APIError('Such user already exists', 400, { code: 12 })

        const hashedPwd = await bcrypt.hash(password, 12)
        const data = { name: username, password: hashedPwd }
        const user = await models.user.create({data})

        req.session.userID = user.id
        res.json({ id: user.id, name: user.name })

    } catch(err) { next(err) }
})

router.post('/login', async (req: AuthedRequest, res, next) => {
    try {
        const { username, password } = req.body
        if (typeof password != 'string') throw new APIError('No password', 400, {code:10})

        const user = await getUserByName(username)
        if (!user) throw new APIError('Such user does not exist', 400, { code: 13 })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            throw new APIError('Wrong password', 403, { code: 14 })

        req.session.userID = user.id
        res.json({ id: user.id, name: user.name })
    } catch(err) { next(err) }
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

export default router