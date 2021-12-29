const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
// 生成token
const jwt = require('jsonwebtoken')
const secrect = 'unique'
router.post('/login', async (req, res, next) => {
    try {
        const userData = {
            username: req.body.username,
            password: req.body.password
        }
        const user = await modles.User.findOne({ where: { username: userData.username, password: userData.password } })
        // 生成token
        const token = jwt.sign({
            id: String(user.id)
        }, secrect)
        res.json({
            user,
            token
        })
    } catch (error) {
        next(error)
    }
})
router.post('/admin/login', (req, res, next) => {
    try {
        let { username, password } = req.body
        modles.admin.findOne({
            where: {
                username, password
            }
        }).then(adminer => {
            if (adminer) {
                res.json({
                    adminer,
                    success: true,
                    msg: '登录成功'
                })
            } else {
                res.json({
                    success: false,
                    msg: '登录失败'
                })
            }
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router