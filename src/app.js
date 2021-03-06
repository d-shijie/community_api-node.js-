const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Token')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})
// 解析req.body
app.use(express.json())
app.use(express.urlencoded())
// 已被express.json express.urlencoded替代
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 导入路由
const eventRouter = require('./router/event_router')
// const uploadRouter = require('./router/upload_router')
const register = require('./router/register_router')
const login = require('./router/login_router')
const profile = require('./router/profile_router')
const search = require('./router/search_router')
const userDetail = require('./router/userDetail_router')
const upload = require('./router/upload_router')
const command=require('./router/command_router')
const follow=require('./router/follow_router')
const chat=require('./router/chat_router')
const count=require('./router/count_router')
app.use(eventRouter)
// app.use(uploadRouter)
app.use(register)
app.use(login)
app.use(profile)
app.use(search)
app.use(userDetail)
app.use(upload)
app.use(command)
app.use(follow)
app.use(chat)
app.use(count)
// 错误处理
app.use((err, req, res, next) => {
    if (err) {
        res.json({
            msg: err.message
        })
    }
})
// 默认端口号
app.listen(3000, (req, res) => {
    console.log('http://localhost:3000');
})