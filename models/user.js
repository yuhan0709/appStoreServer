var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  userId: {
    type: String
  },
  //邮箱
  mail: {
    type: String,
    required: true
  },
  // 用户名
  userName: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
  // 账户余额
  account: {
    type: String,
    default: 0
  },
  // 已经安装的产品
  hasInstalled: {
    type: Object,
    default: [],
  },
  // 用户头像
  Avatar: {
    type: String,
    // required: true
  }
})
let user = module.exports = mongoose.model('User', userSchema);