//引入数据库
let mongoose=require('mongoose')
//引入模式对象
let Schema=mongoose.Schema
//做数据模型
let userRule = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now()
    },
    enable_flag: {
        type: String,
        default:'Y'
    }
})

module.exports = mongoose.model('user', userRule)
