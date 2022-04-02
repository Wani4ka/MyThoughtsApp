import {AuthedRequest, authUser} from '../core/user'
import models from '../core/models'
import config from '../config'
import {APIError} from '../core/error'
import {Router} from 'express'

const router = Router()

router.get('/get', authUser, async (req, res, next) => {
    try {
        const page = Number(req.query.page || 1)
        if (!(page && page > 0)) throw new APIError('Incorrect page number', 400, {code: 3, page: req.query.page})

        const thoughts = await models.thought.findMany({
            skip: (page - 1) * config.pageSize,
            take: config.pageSize,
            orderBy: [{id: 'desc'}],
            select: {
                id: true,
                content: true,
                createdAt: true,
                author: {select: {name: true}},
            },
        })
        const total = (await models.thought.count({select: {_all: true}}))._all
        res.json({total, pages: Math.ceil(total / config.pageSize), thoughts})
    } catch (err) {
        next(err)
    }
})

router.post('/write', authUser, async (req: AuthedRequest, res, next) => {
    try {
        const content = req.body.content
        if (typeof content != 'string') throw new APIError('No content', 400, {code: 4})
        if (content.length < 10) throw new APIError('Thought content is too short', 400, {code: 5})
        if (content.length > 8192) throw new APIError('Thought content is too long', 400, {code: 5})

        const thought = await models.thought.create({
            data: {
                author: {
                    connect: {id: req.session.userID},
                },
                content: content,
            },
            select: {
                id: true,
            },
        })
        res.json(thought)
    } catch (err) {
        next(err)
    }
})

export default router