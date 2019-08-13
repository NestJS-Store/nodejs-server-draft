/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 17:05:02
 */
let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')
const Op = Sequelize.Op

const STATUS = require('../../status/index');


let dao = require('../../dao/' + path.basename(__dirname))

router.get('/', async function(ctx, next) {

  // Get 请求在 ctx.request.query 对象上面
  let body = ctx.request.query

  const { email } = body

  let whereJson = {}

  if (email) {
    whereJson = {
      email
    }

  } else {
    return ctx.return(STATUS.Normal.NOT_VALID_QUERY, 'User Search Query Is Not Valid!', {})
  }

  let data = await dao.search(whereJson)

  if(data) {
    ctx.sessions = {
      name: 'id'
    }
    return ctx.return(STATUS.Normal.SUCCESS, 'Search success', data)
  } else {
    return ctx.return(STATUS.User.USER_NOT_EXIST, "User isn't Found!", {})
  }
})

module.exports = router.routes()
