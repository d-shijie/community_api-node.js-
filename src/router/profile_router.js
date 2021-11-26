const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/profile', async (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { id } = jwt.verify(raw, 'unique')
    const user = await modles.User.findOne({
        where: { id: id }
    })
    res.json(user)
})
module.exports = router