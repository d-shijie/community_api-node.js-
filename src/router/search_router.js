const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.get('/search/:keywords', (req, res, next) => {
    try {
        const keywords = req.params.keywords

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