const express = require('express')
const path = require('path')
const router = express.Router()
const modles = require('../../db/models')
const multer = require('multer')
const OSS = require('ali-oss')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/upload')
    },
    filename: function (req, file, cb) {
        let extname = path.extname(file.originalname)
        cb(null, Date.now() + extname)
    }
})
const upload = multer({ storage: storage })
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: 'dshijie',
})
router.post('/publish', upload.single('file'), async (req, res, next) => {
    try {
        let data = {}
        let result = await client.put(req.file.filename, req.file.path)
        data.imgUrl = result.url;
        data.name = req.body.name
        data.title = req.body.title
        data.content = req.body.content
        data.userId = req.body.userId
        data.category = req.body.category
        modles.event.create(data).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.json({
                msg: err
            })
        })

    } catch (error) {
        next(error)
    }


})
router.post('/uploadAvator', upload.single('file'), async (req, res, next) => {
    try {
        let username = req.body.username
        let result = await client.put(req.file.filename, req.file.path)
        let headImg = result.url
        modles.UserDetail.update({ headImg },
            {
                where: { username }
            }).then(data => {
                data.headImg = headImg
             
            })
    } catch (error) {
        next(error)
    }
})
module.exports = router
