import {Router} from 'express'
import {AuthedRequest, authUser, getUserByName} from '../core/user'
import config from '../config'
import {APIError} from '../core/error'

const router = Router()

router.get('/whoami', authUser, (req: AuthedRequest, res) => res.json(req.session.user))

router.post('/login', async (req: AuthedRequest, res, next) => {
    try {
        if (req.body.invite !== config.invite) throw new APIError('Invalid invite', 400, { code: 9 })
        const user = await getUserByName(req.body.username, true)
        if (user == null) throw new Error('Couldn\'t get or create user ' + req.body.username)
        req.session.user = user
        res.json(user)
    } catch (err) { next(err) }
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

export default router