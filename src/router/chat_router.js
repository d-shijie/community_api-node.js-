const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.post('/sendMessage', (req, res, next) => {
    try {
        let data = req.body
        modles.Chat.create(data).then(data1 => {
            res.json({
                msg: '发送成功'
            })
        })
    } catch (error) {
        next(error)
    }
})
router.get('/messages', (req, res, next) => {
    try {
        let sequelize = require('sequelize')
        const Op = sequelize.Op
        let userId = parseInt(req.query.userId)
        let followId = parseInt(req.query.followId)
        modles.Chat.findAndCountAll({
            where: {
                [Op.or]: [
                    { userId, followId },
                    { userId: followId, followId: userId }
                ]
            }
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