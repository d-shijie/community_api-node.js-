const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.get('/events/:category/:page', async (req, res, next) => {
    try {
        let { category, page } = req.params
        let limit = 20
        let offset = (page - 1) * limit
        let where = {}
        // -1全部 0推荐 1生活 2政治 3娱乐
        if (category != -1) {
            where.category = category
        }
        let data = await modles.event.findAndCountAll({
            where,
            limit,
            offset
        })
        res.json({
            data
        })
    } catch (error) {
        next(error)
    }
})
router.get('/userEvents', (req, res, next) => {
    try {
        modles.event.findAndCountAll({
            where: { userId: req.query.id }
        }).then(data => {
            res.json(data)
        }).catch(err => {
            res.json({
                msg: err
            })
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router