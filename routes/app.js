const Router = require("koa-router");
const App = require("../models/app");
const router = new Router();

// 获取用户信息
router.get("/AppList", async (ctx) => {
  try {
    const Lists = await App.find();
    const result = {
      code: 1,
      data: Lists,
      message: "成功"
    }
    ctx.body = result
  } catch (err) {
    ctx.body = {
      code: 0,
      message: "出现错误"
    }
    return;
  }
})

// 分类获取
router.get("/AppList/:type", async (ctx) => {
  try {
    const Lists = await App.find(ctx.params);
    const result = {
      code: 1,
      data: Lists,
      message: "成功"
    }
    ctx.body = result
  } catch (err) {
    ctx.body = {
      code: 0,
      message: "出现错误"
    }
    return;
  }
})

module.exports = router;