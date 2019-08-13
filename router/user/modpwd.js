/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 20:22:09
 */
let path = require('path');
let router = require('koa-router')();
let Sequelize = require('sequelize');

const STATUS = require('../../status/index');

let dao = require('../../dao/' + path.basename(__dirname));

let md5 = require('../../utils/lib/md5');

router.put('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;


  whereJson = {
    email: post.email
  }

  const isExisted = await dao.search(whereJson)

    if(!isExisted) {
      return ctx.return(STATUS.Normal.FAILED, '用户不存在', null);
    }

  if (!post.password) {
    return ctx.return(STATUS.Normal.FAILED, '密码不能为空', null);
  }

  let data = await dao.update({
    password: md5(post.password)
  }, {
      email: post.email
    });

  return ctx.return(STATUS.Normal.SUCCESS, '密码修改成功！', null);

});

module.exports = router.routes();
