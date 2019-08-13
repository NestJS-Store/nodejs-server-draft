/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 20:16:57
 */
const STATUS = require('../../status/index');

let router = require('koa-router')()

let path = require('path');

let dao = require('../../dao/' + path.basename(__dirname));


router.get('/', async function (ctx, next) {

  let post = ctx.request.query;

  let res_user = await dao.search({
    email: post.email
  }, true);

  if (!res_user) {
    return ctx.return(STATUS.Login.USER_NOT_EXIST, '用户不存在');
  }


    ctx.session.user = res_user

    return ctx.return(STATUS.Normal.SUCCESS, 'Profile Get Success!', res_user);

});

module.exports = router.routes();
