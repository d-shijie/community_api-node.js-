const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.post('/register', (req, res, next) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password
        }
        //查看是否已存在用户名
        modles.User.findOne({
            where: { username: userData.username }
        }).then(user => {
            if (!user) {
                modles.User.create(userData).then(res => {
                    let userDetail = {}
                    let userid
                    userDetail.username = res.username
                    userDetail.age = '18'
                    userDetail.sex = '男'
                    userDetail.desc = '太懒了 没有描述'
                    userDetail.headImg = 'https://img1.baidu.com/it/u=3293231005,2758635617&fm=26&fmt=auto'
                    userDetail.userid = res.id
                    modles.UserDetail.create(userDetail).then(res => {

                    })
                    res.json({
                        msg: '注册成功'
                    })
                }).catch(err => {
                    res.json({
                        msg: '注册成功'
                    })
                })

            } else {
                res.json({
                    msg: '用户名已存在'
                })
            }
        }).catch(err => {
            res.json({
                msg: 'error:' + err
            })
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router