let path = require('path');
let router = require('koa-router')();

let Sequelize = require('sequelize')
const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname));

router.post('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;
  let page = post.page;
  let pageSize = post.pageSize;

  const whereJson = {
    name: {
      [Op.like]: '%' + post.name + '%'
    }
  }

  let res = await dao.list(whereJson, page, pageSize);

  const data = 
  res ? 
    {
      count: res.count,
      data: res.rows,
      code: 0,
      page,
      pageSize
    }
    : null

    if  (data) {
      return ctx.return(0, 'List success!', data);
    } else {
      return ctx.return(-1, 'List failed!', data);
    }

});

module.exports = router.routes();