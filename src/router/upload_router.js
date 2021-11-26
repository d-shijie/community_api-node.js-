const express = require('express')
const path = require('path')
const router = express.Router()
const modles = require('../../db/models')
const multer = require('multer')
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
router.post('/publish', upload.single('file'), (req, res, next) => {
    try {
        console.log(req.file.filename);
        let data = {}
        console.log(req.file);
        data.imgUrl = req.file.filename;
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
module.exports = router