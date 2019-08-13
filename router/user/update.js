/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-12 17:40:25
 */
let path = require('path');
let router = require('koa-router')();
let Sequelize = require('sequelize');

const STATUS = require('../../status/index');


const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname));

router.post('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;

  // 暂时通过手机作为唯一标识进行更新
  const where = {
    email: post.email,
  }

  const isExisted = await dao.search({
    email: {
      [Op.like]: '%' + post.email + '%'
    }
  })

  if (isExisted) {
    await dao.update(post, where);
    return ctx.return(STATUS.Normal.SUCCESS, 'User updated success!', {});
  } else {
    return ctx.return(STATUS.User.USER_NOT_EXIST, "User isn't found!", {});
  }

});

module.exports = router.routes();
