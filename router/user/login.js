/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 20:24:36
 */
const STATUS = require('../../status/index');

let path = require('path');
let router = require('koa-router')();
let Sequelize = require('sequelize');

let dao = require('../../dao/' + path.basename(__dirname));

let md5 = require('../../utils/lib/md5');

router.post('/', async function (ctx, next) {

  let post = ctx.request.body;

  let res_user = await dao.search({
    email: post.email
  });

  if (!res_user) {
    return ctx.return(STATUS.Login.USER_NOT_EXIST, '用户不存在');
  }


  const correct_pwd = res_user.password === md5(post.password) // 加密方式为：32位小写 MD5

  if (correct_pwd) {

    const data = {
      id: res_user.id,
      name: res_user.name,
      email: res_user.email
    }

    ctx.session.user = data

    return ctx.return(STATUS.Login.LOGIN_SUCCESS, '登录成功', data);

  } else {

    ctx.session.user = null;

    return ctx.return(STATUS.Login.PASSWORD_NOT_CORRECT, '请输入正确的账号和密码');
  }

});

module.exports = router.routes();
