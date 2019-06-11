const Router = require("koa-router");
const App = require("../models/app");
const Detail = require("../models/detail");
const router = new Router();

// 获取软件详情
router.get("/AppDetail/:appId", async (ctx) => {
  const params = { appId: Number(ctx.params.appId) }
  const appItem = await App.find(params);
  const item = await Detail.find(params);
  console.log(appItem, item);
  ctx.body = {
    message: "成功",
    code: 1,
    data: {
      ...appItem[0]._doc,
      ...item[0]._doc
    }
  }
})

router.get("/homeSlider", async (ctx) => {
  const appList = await App.find({});
  const detailList = await Detail.find({})
  const sliderId = [];
  const sliderItem = [];
  const length = appList.length;
  while (sliderId.length < 4) {
    const item = Math.floor(Math.random() * length);
    if (!sliderId.includes(item)) {
      sliderId.push(item);
    }
  }
  sliderId.forEach((item) => {
    const result = {
      appId: appList[item].appId,
      appName: appList[item].appName,
      appPhoto: detailList[item].appPhoto[0],
      appWord: appList[item].appWord
    }
    sliderItem.push(result)
  })
  ctx.body = {
    code: 1,
    message: "成功",
    data: sliderItem
  }
})

router.get("/homeRecommed", async (ctx) => {
  const appList = await App.find({});
  const detailList = await Detail.find({})
  const sliderId = [];
  const sliderItem = [];
  const length = appList.length;
  while (sliderId.length < 2) {
    const item = Math.floor(Math.random() * length);
    if (!sliderId.includes(item)) {
      sliderId.push(item);
    }
  }
  sliderId.forEach((item) => {
    const result = {
      appId: appList[item].appId,
      appName: appList[item].appName,
      appPhoto: appList[item].appIcon,
      appWord: appList[item].appWord,
      appDetail: detailList[item].appDetail
    }
    sliderItem.push(result)
  })
  ctx.body = {
    code: 1,
    message: "成功",
    data: sliderItem
  }
})

router.post("/homeSearch", async (ctx) => {
  const params = ctx.request.body;
  ctx.body = params;
  const appList = await App.find({});
  const resultData = []
  appList.forEach((item) => {
    if (item.appName.includes(params.searchValue) || item.appName.toLowerCase().includes(params.searchValue.toLowerCase())) {
      resultData.push({
        appId: item.appId,
        appName: item.appName
      })
    }
  })
  ctx.body = {
    code: 1,
    message: "成功",
    data: resultData
  }
})


module.exports = router;
