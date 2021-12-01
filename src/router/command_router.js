const express = require('express')
const modles = require('../../db/models')
const router = express.Router()
router.post('/command', (req, res, next) => {
    try {
        let data = {}
        data.name = req.body.username
        data.userId = req.body.userId
        data.eventId = req.body.eventId
        data.content = req.body.content
        modles.Command.create(data).then(() => {
            res.json({
                msg: '发布成功'
            })
        }).catch(err => {
            res.json({
                msg: '发布失败'
            })
        })
    } catch (error) {
        next(error)
    }
})
router.get('/command', (req, res, next) => {
    try {
          modles.Command.findAndCountAll({
              where:{eventId:req.query.id}
          }).then(data=>{
              res.json(data)
          }).catch(err=>{
              res.json({
                  msg:err
              })
          })
    } catch (error) {
        next(error)
    }
})
module.exports = router