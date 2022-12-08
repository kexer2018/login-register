
//专门管理页面展示路由的路由器
//引入路由器构造函数
const { Router } = require('express')
//创建路由器实例
let router = new Router()
//引入path模块---Node中一个专门用来解决路径问题的库
let {resolve} = require('path')

//展示页面的路由(UI路由)
router.get('/login', async (req, res) => {
    let url=resolve(__dirname,'../public/login.html')
    res.sendFile(url)
})
router.get('/register', async (req, res) => {
    let url=resolve(__dirname,'../public/register.html')
    res.sendFile(url)
})

module.exports = router

