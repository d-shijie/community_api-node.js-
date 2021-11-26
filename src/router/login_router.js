const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
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
module.exports = router