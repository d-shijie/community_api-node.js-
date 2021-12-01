const e = require('express');
const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.post('/follow', (req, res, next) => {
    try {
        let { username, followId, userId } = req.body;
        let headImg = ''
        modles.UserDetail.findOne({
            where: { username: username }
        }).then(user => {
            if (user) {
                headImg = user.headImg
                let data = {}
                data.username = username
                data.followId = followId
                data.userId = userId
                data.headImg = headImg
                modles.Follow.findAndCountAll({
                    where: { followId: data.followId }
                }).then(user1 => {
                    let userIds = []
                    for (let k of user1.rows) {
                        userIds.push(k.userId)
                    }
                    if (userIds.indexOf(parseInt(userId)) != -1) {
                        res.json({
                            msg: '已关注'
                        })
                    } else {
                        modles.Follow.create(data).then(result => {
                            res.json({
                                msg: '关注成功'
                            })
                        }).catch(err => {
                            res.json({
                                msg: '关注失败'
                            })
                        })
                    }
                })
            } else {
                res.json({
                    msg: '未找到用户'
                })
            }
        })
    } catch (error) {
        next(error)
    }
})
router.get('/followList', (req, res, next) => {
    try {
        let userId = req.query.userId
        modles.Follow.findAndCountAll({
            where: { userId }
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
router.get('/followedList', (req, res, next) => {
    try {
        let followId = req.query.followId
        let fans = []
        let usernames = []
        modles.Follow.findAndCountAll({
            where: { followId }
        }).then(data => {
            for (let k of data.rows) {
                fans.push(k.userId)
            }
            modles.User.findAndCountAll({
                where: { id: fans }
            }).then(data => {
                for (let j of data.rows) {
                    usernames.push(j.username)
                }
                modles.UserDetail.findAndCountAll({
                    where: { username: usernames }
                }).then(data => {
                    res.json(data)
                })
            })
        }).catch(err => {
            res.json({
                msg: err
            })
        })
    } catch (error) {
        next(error)
    }
})
router.post('/deleteFollow', (req, res, next) => {
    try {
        let { userId, followId } = req.body
        modles.Follow.destroy({
            where: { userId, followId }
        }).then(data => {
            res.json({
                msg: '取消关注成功'
            }).catch(err => {
                res.json({
                    msg: '取消关注失败'
                })
            })
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router