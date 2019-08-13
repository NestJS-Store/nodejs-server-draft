/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 19:56:36
 */

const STATUS = require('../../status/index');

let md5 = require('../../utils/lib/md5');

let path = require('path')
let router = require('koa-router')()

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {

  let post = ctx.request.body

  if(Array.isArray(post)) {
    post.map(r => r.password = md5(r.password) )
  }

  await dao.batchCreate(post)

  return ctx.return(STATUS.User.CREATE_SUCCESS, 'User added success!', {})

})

module.exports = router.routes()
