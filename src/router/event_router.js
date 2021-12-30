const express = require('express')
const path = require('path')
const modles = require('../../db/models')
const router = express.Router()
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
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI5tFKDsjWhbhmRT9qdaMJ',
    accessKeySecret: 'hcUJd1K41fYaxQImNNIuHMCTaavc8d',
    bucket: 'dshijie',
})
const upload = multer({ storage: storage })
router.get('/events/:category/:page', async (req, res, next) => {
    try {
        let { category, page } = req.params
        let limit = 20
        let offset = (page - 1) * limit
        let where = {}
        // -1全部 0推荐 1生活 2政治 3娱乐
        if (category != -1) {
            where.category = category
        }
        let data = await modles.event.findAndCountAll({
            where,
            limit,
            offset
        })
        res.json({
            data
        })
    } catch (error) {
        next(error)
    }
})
router.get('/userEvents', (req, res, next) => {
    try {
        modles.event.findAndCountAll({
            where: { userId: req.query.id }
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
router.post('/eventDelete', (req, res, next) => {
    try {

        modles.event.destroy({
            where: {
                id: req.body.id
            }
        }).then(data => {
            res.json({
                msg: '删除成功'

            })
        })
    } catch (error) {
        next(error)
    }
})
router.get('/event', (req, res, next) => {
    try {
        let { id } = req.query
        modles.event.findOne({
            where: {
                id
            }
        }).then(result => {
            res.json(result)
        }).catch(err => {
            res.json({
                msg: err
            })
        })
    } catch (error) {
        next(error)
    }
})
router.post('/updateEvent', upload.single('file'), async (req, res, next) => {
    try {
        const { id, name, title, content, category } = req.body
        let result = {}
        if (req.body.file === '') {
            modles.event.findOne({
                where: {
                    id
                }
            }).then(data => {
                result.url = data.imgUrl
            })
        } else {
            result = await client.put(req.file.filename, req.file.path)
        }
        modles.event.findOne({
            where: {
                id
            }
        }).then(event => {
            if (event) {
                event.update({
                    name, title, content, imgUrl: result.url, category
                }).then(r => {
                    res.json({
                        msg: '更新成功'
                    })
                }).catch(err => {
                    res.json({
                        msg: '更新失败'
                    })
                })
            } else {
                res.json({
                    msg: '更新失败'
                })
            }
        })

    } catch (error) {
        next(error)
    }
})
router.get('/searchEvent', (req, res, next) => {
    let { title } = req.query
    modles.event.findAndCountAll({
        where: {
            title
        }
    }).then(data => {
        if (data.count != 0) {
            res.json({
                data,
                success: true,
                msg: '搜索成功'
            })
        } else {
            res.json({
                msg: '无搜索结果',
                success: false
            })
        }
    }).catch(err => {
        res.json({
            msg: err,
            success: false
        })
    })
})
module.exports = router