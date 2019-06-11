var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
  // 软件详细介绍
  appDetail: {
    type: String,
    required: true
  },
  // 软件界面图
  appPhoto: {
    type: Object,
    default: []
  },
  // 软件评分
  appRate: {
    type: String,
    default: "0"
  },
  // 软件开发商
  appDeveloper: {
    type: String,
    required: true
  },
  // 软件大小
  appSize: {
    type: String,
    required: true
  },
  // 语言
  appLanguage: {
    type: String,
    default: "中文"
  },
  // 版权
  appCopyRight: {
    type: String,
    default: "@2018 cqupt"
  },
  // 适用年龄
  appAge: {
    type: String,
    default: "12"
  }
})
let Detail = module.exports = mongoose.model('Detail', DetailSchema);