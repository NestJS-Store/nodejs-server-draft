let path = require('path');
let router = require('koa-router')();

let dao = require('../../dao/' + path.basename(__dirname));

router.post('/', async function (ctx, next) {

  let get = ctx.request.query;
  let post = ctx.request.body;
  let page = post.page;
  let pageSize = post.pageSize;

  let data = await dao.list({name: post.name}, page, pageSize);

  const resData = data ? 
    {
      count: data.count,
      data: data.rows,
      code: 0,
      page,
      pageSize
    }
    : null
  return ctx.return(0, '', resData);

});

module.exports = router.routes();