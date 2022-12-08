const mongoose = require('mongoose')
//连接数据库
function connectMongo(success, failed) {
    //1.连接数据库
    mongoose.connect('mongodb://localhost:27017/server', {
        useNewUrlParser: true
    })

    //2.绑定数据库连接的监听
    mongoose.connection.on('open', (err) => {
        if (err) {
            console.log('数据库连接失败', err)
            failed('connect failed')
        } else {
            console.log('数据库连接成功')
            success()
        }
    })
}

module.exports = connectMongo

