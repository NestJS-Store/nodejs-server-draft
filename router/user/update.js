let path = require('path');
let router = require('koa-router')();
let Sequelize = require('sequelize');

const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname));

router.post('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;

  // 暂时通过手机作为唯一标识进行更新
  const where = {
    phone: post.phone,
  }

  const isExisted = await dao.search({
    phone: {
      [Op.like]: '%' + post.phone + '%'
    }
  })

  if (isExisted) {
    await dao.update(post, where);
    return ctx.return(0, 'User updated success!', {});
  } else {
    return ctx.return(-1, "User isn't found!", {});
  }

});

module.exports = router.routes();
