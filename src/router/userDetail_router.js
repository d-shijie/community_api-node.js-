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
router.delete('/deleteUser', (req, res, next) => {
    try {
        console.log(req.body.id);
        let { id } = req.body
        modles.User.destroy({
            where: {
                id
            }
        }).then(result => {
            modles.UserDetail.destroy({
                where: {
                    userid: id
                }
            }).then(result => {
                res.json({
                    msg: '删除成功',
                    success: true
                })
            }).catch(err => {
                res.json({
                    msg: '删除失败',
                    success: false
                })
            })
        }).catch(err => {
            res.json({
                msg: '删除失败',
                success: false
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
                }).then(data => {
                    res.json({
                        msg: '更新成功'
                    })
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