//引入路由器构造函数
const { Router } = require('express')
//创建路由器实例
let router = new Router()
//引入模型对象，进行增删改查
let userModel=require('../data/moudle')

//用以处理用户注册的请求
router.post('/register', (req, res) => {
    //1.获取数据
    const { email, nickname, password, re_password } = req.body
    /*2.校验数据的合法性
        //2.1校验成功
            --去数据库查找该数据是否已经存在
                //2.1.1若已经存在,提示用户已经被用了
                //2.1.2若没有存在，则可以直接写入数据库
        //2.2校验失败
            --提示用户哪里不正确
    */
    //定义正则的规则
    const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/
    const nickReg = /[\u4e00-\u9fa5]/gm
    const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
    //使用正则去校验
    if (!emailReg.test(email)) {
        res.send('邮箱格式不合法,请检查')
    } else if (!nickReg.test(nickname)) {
        res.send('昵称的格式不正确,昵称只能包含中文，请检查')
    } else if (!passwordReg.test(password)) {
        res.send('密码格式不合法,请检查')
    } else if (password !== re_password) {
        res.send('两次输入的密码不一致,请检查')
    } else {
        //去数据库中查找该邮箱是否注册过
        userModel.findOne({ email }, function (err, data) {
            if (data) {
                //如果注册过的话会通知用户哪一个邮箱被注册
                //引入一个计数的模块,当达到一个敏感的阈值即多次注册同一个邮箱时，会触发一定的安全性机制
                console.log(`邮箱为${email}的用户注册失败,因为邮箱重复`)
                res.send('该邮箱已经被注册过了,请更换')
            } else {
                userModel.create({email,nickname,password}, function (err, data) {
                    if (!err) {
                        console.log(`邮箱为${email}的用户注册成功`)
                        res.send('注册成功了')
                    } else {
                        //引入报警模块,当达到敏感阈值,触发报警
                        console.log(err)
                        res.send('当前的网络状态不稳定,稍后请重试')
                    }
                })
            }
        })
    }
})
//用以处理用户登录的请求
router.post('/login', (req, res) => {
    //获取输入
    const { email, password } = req.body
    //验证输入(正则验证)
    const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/
    const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
    if (!emailReg.test(email)) {
        res.send('邮箱的格式不对,请检查后重新输入')
    } else if (!passwordReg.test(password)) {
        res.send('密码格式不符合要求,请换一个密码登录')
    } else {
        //去数据库中查找是否有这个数据
        userModel.findOne({ email, password }, (err, data) => {
            if (err) {
                console.log(err)
                res.send('网络不稳定,请稍后重试')
                return
            } 
            if (data) {
                res.redirect('http://www.baidu.com')
            } else {
                res.send('用户名或密码输入错误')
            }
        })
    }
})

module.exports = router
