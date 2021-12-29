const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.get('/search/:keywords', (req, res, next) => {
    try {
        const keywords = req.params.keywords
        // 只支持标题的搜索 并且要完整的标题
        modles.event.findAndCountAll({
            where: { title: keywords }
        }).then(event => {
            res.json(event)
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