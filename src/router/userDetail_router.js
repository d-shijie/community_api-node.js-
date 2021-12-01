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
router.post('/userDetail', (req, res, next) => {
    try {
        let { sex, age, desc, username } = req.body
        modles.UserDetail.findOne({
            where: { username: username }
        }).then(user => {
            if (user) {
                user.update({
                    sex, age, desc
                }).catch(err => {
                    res.json({
                        msg: err
                    })
                })
            } else {
                res.json({
                    msg: '更新失败'
                })
            }
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