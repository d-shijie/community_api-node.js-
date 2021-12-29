const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.get('/count', async (req, res, next) => {
    try {
        let userCount = await modles.User.findAndCountAll()
        let eventCount = await modles.event.findAndCountAll()
        let AdminerCount = await modles.admin.findAndCountAll()
        res.json({
            userCount,
            eventCount,
            AdminerCount
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router