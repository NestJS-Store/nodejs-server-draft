/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 19:39:12
 */
let path = require('path');
let router = require('koa-router')();
let Sequelize = require('sequelize');

let md5 = require('../../utils/lib/md5');

const STATUS = require('../../status/index');


const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname));

router.put('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;

  if (post.password) {
    post.password = md5(post.password)
  }

  // 暂时通过作为 邮箱 唯一标识进行更新
  const where = {
    email: post.email,
  }

  const isExisted = await dao.search({
    email: post.email
  })

  if (isExisted) {
    await dao.update(post, where);
    return ctx.return(STATUS.Normal.SUCCESS, 'User updated success!', {});
  } else {
    return ctx.return(STATUS.User.USER_NOT_EXIST, "User isn't found!", {});
  }

});

module.exports = router.routes();
