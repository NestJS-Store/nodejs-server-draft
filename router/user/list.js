/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 20:07:44
 */
let path = require('path');
let router = require('koa-router')();

let Sequelize = require('sequelize')
const Op = Sequelize.Op

const STATUS = require('../../status/index');

let dao = require('../../dao/' + path.basename(__dirname));

router.get('/', async function (ctx, next) {

  let get = ctx.request.query;
  let page = get.page;
  let pageSize = get.pageSize;

  const whereJson = {
    name: {
      [Op.like]: '%' + get.name + '%'
    }
  }

  let res = await dao.list(whereJson, + page, + pageSize);

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
