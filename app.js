const Koa = require('koa')
const app = new Koa();
const router1 = require("./routes/user");
const router2 = require("./routes/app");
const router3 = require("./routes/detail");
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');
const cors = require("koa-cors");
const App = require("./models/app");
const Detail = require("./models/detail");
const AppList = require("./data/apps.json");
const AppDetail = require("./data/details.json");
mongoose.connect('mongodb://localhost:27017/appStore', { useNewUrlParser: true })
app.use(async (ctx, next) => {
  const all = await App.find();
  const details = await Detail.find();
  if (all.length == 0 || details.length == 0) {
    for (let i = 0; i < AppList.length; i++) {
      const app = new App(AppList[i])
      const detail = new Detail(AppDetail[i]);
      detail.save();
      app.save();
    }
  }
  await next();
})
app.use(cors());
app.use(bodyParser());
app.use(router1.routes());
app.use(router2.routes());
app.use(router3.routes());
app.listen(3000)