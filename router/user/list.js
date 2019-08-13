/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-12 17:31:28
 */
let path = require('path');
let router = require('koa-router')();

let Sequelize = require('sequelize')
const Op = Sequelize.Op

const STATUS = require('../../status/index');

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
      return ctx.return(STATUS.Normal.SUCCESS, 'List success!', data);
    } else {
      return ctx.return(STATUS.Normal.FAILED, 'List failed!', data);
    }

});

module.exports = router.routes();
