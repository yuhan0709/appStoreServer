const Router = require("koa-router");
const User = require("../models/user");
const App = require("../models/app");
const router = new Router();

// 获取用户信息
router.get("/users/:userId", async (ctx) => {
  const id = ctx.params;
  try {
    const users = await User.find({ _id: id.userId });
    let userCopy = {};
    const user = users[0];
    user.userId = user._id;
    userCopy = { ...user._doc };
    userCopy.userId = userCopy._id;
    delete userCopy.password;
    delete userCopy._id;
    const hasInstalled = [...userCopy.hasInstalled];
    userCopy.hasInstalled = [];
    for (let i = 0; i < hasInstalled.length; i++) {
      if (!hasInstalled[i]) {
        break;
      }
      const app = await App.find({ appId: hasInstalled[i] });
      app[0].appId = app[0]._id;
      app[0].appCost = 0;
      delete app[0]._id;
      const hasInstalledDetail = {
        ...app[0]
      }
      userCopy.hasInstalled.push(hasInstalledDetail._doc);
    }
    const result = {
      code: 1,
      data: userCopy,
      message: "成功"
    }
    ctx.body = result
  } catch (err) {
    ctx.body = {
      code: 0,
      message: "暂无用户信息"
    }
    return;
  }
})

// 用户注册
router.post("/userRegister", async (ctx) => {
  let postData = ctx.request.body;
  delete postData.rePassword;
  let unique = true;
  let result = null;
  const allUser = await User.find({});
  for (let i = 0; i < allUser.length; i++) {
    if (allUser[i].mail == postData.mail) {
      unique = false;
      break;
    }
  }
  if (unique) {
    const user = new User(postData);
    await user.save();

    result = {
      code: 1,
      message: "成功"
    }
  } else {
    result = {
      code: 0,
      message: "失败，该邮箱已被注册"
    }
  }
  ctx.body = result;
})

// 用户登陆
router.post("/userLogin", async (ctx) => {
  let postData = ctx.request.body;
  let result = null;
  let userKey = postData.mail ? { mail: postData.mail } : { userName: postData.userName };
  const user = await User.find(userKey);
  let findUser = false;
  if (!user || user.length === 0) {
    result = {
      code: 0,
      message: "尚未注册！"
    }
  } else {
    for (let i = 0; i < user.length; i++) {
      if (postData.password == user[i].password) {
        findUser = user[i];
        break;
      }
    }
    if (!findUser) {
      result = {
        code: 0,
        message: "密码错误！",
      }
    } else {
      const userCopy = { ...findUser._doc };
      userCopy.userId = userCopy._id;
      delete userCopy._id;
      delete userCopy.__v;
      delete userCopy.password;
      result = {
        code: 1,
        message: "登陆成功！",
        data: userCopy
      }
    }
  }
  ctx.body = result;
})

// 充值
router.post("/user/add", async (ctx) => {
  const params = ctx.request.body;
  const user = await User.find({ _id: params.userId });
  if (!user || !user[0]) {
    ctx.body = {
      message: "充值失败",
      code: 0
    }
    return;
  }
  const account = Number(user[0].account) + Number(params.account);
  await User.updateOne({ _id: params.userId }, { account: account })
  const newUser = await User.find({ _id: params.userId });
  ctx.body = {
    code: 1,
    message: "充值成功！",
    data: newUser[0].account
  }
})

// 消费
router.post("/user/reduce", async (ctx) => {
  const params = ctx.request.body;
  const user = await User.find({ _id: params.userId });
  if (!user || !user[0]) {
    ctx.body = {
      message: "消费失败",
      code: 0
    }
    return;
  }

  if (Number(user[0].account) < Number(params.account)) {
    ctx.body = {
      message: "失败，余额不足请充值！",
      code: 0,
      data: {
        account: user[0].account
      }
    }
    return
  }
  const account = Number(user[0].account) - Number(params.account);
  await User.updateOne({ _id: params.userId }, { account: account })
  const newUser = await User.find({ _id: params.userId });
  ctx.body = {
    code: 1,
    message: "消费成功！",
    data: newUser[0].account
  }
})

// 下载成功
router.post("/user/download", async (ctx) => {
  const params = ctx.request.body;
  const user = await User.find({ _id: params.userId });
  const installedApp = user[0].hasInstalled;
  if (!installedApp.includes(params.appId)) {
    installedApp.push(params.appId);
  }
  await User.update({ _id: params.userId }, { hasInstalled: installedApp })
  ctx.body = {
    code: 1,
    message: "成功！"
  }
})
module.exports = router;