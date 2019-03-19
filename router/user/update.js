let path = require('path');
let router = require('koa-router')();
let Sequelize = require('sequelize');

let dao = require('../../dao/' + path.basename(__dirname));

router.post('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;

  // 暂时通过手机作为唯一标识进行更新
  const where = {
    phone: post.phone,
  }

  let data = await dao.update(post, where);

  return ctx.return(0, '', data);

});

module.exports = router.routes();
