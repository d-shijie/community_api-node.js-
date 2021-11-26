const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.get('/userDetail/:userId', (req, res, next) => {
    try {
        let userId = req.params.userId
        modles.UserDetail.findOne({
            where: { userid: userId }
        }).then(detail => {
            res.json(detail)
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