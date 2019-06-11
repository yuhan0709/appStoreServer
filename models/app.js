var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appSchema = new Schema({
  // 主键
  appId: {
    type: Number,
    required: true
  },
  // 软件名
  appName: {
    type: String,
    required: true
  },
  // 软件图标
  appIcon: {
    type: String,
    required: true
  },
  // 软件价格
  appCost: {
    type: String,
    default: 0
  },
  // 软件简介
  appWord: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  // 软件下载链接
  appDownLoad: {
    type: String,
    required: true
  }
})
let app = module.exports = mongoose.model('App', appSchema);