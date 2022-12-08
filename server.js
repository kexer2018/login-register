const express = require('express')
const app = express()

//引入数据库的模块
const db = require('./data/index')
//禁止服务器返回x-powered-by，为了安全
app.disable('x-powered-by')
//使用内置的中间件暴露静态的资源，不访问路由直接写文件名+后缀也可以在浏览器种也可以看到页面
app.use(express.static(__dirname + '/public'))
//中间件解析post请求的urlencoded参数
app.use(express.urlencoded({ extended: true }))
//引入路由器
const UIRouter = require('./router/UIRouter')
const ProfessionRouter=require('./router/Profession')

//连接数据库
db(() => {
    //使用路由器
    app.use(UIRouter)
    app.use(ProfessionRouter)
    app.listen(3000, (err) => {
        if (!err) console.log('服务器启动成功!')
        else console.log(err)
    })
}, (err) => {
    console.log(err)
})

