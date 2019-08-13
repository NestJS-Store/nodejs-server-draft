/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 19:32:52
 */
let path = require('path')
let router = require('koa-router')()

const STATUS = require('../../status/index');

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let post = ctx.request.body


  // FIXME: 区别 字符串 STRING 和 TEXT
  const email = post.email

  whereJson = {
    email: String(email)
  }

  const isExisted = await dao.search(whereJson)

  if (isExisted) {

    const whereJson = {
      email: post.email,
    }

    const updateJson = {
      status: -1,
    }

    // 删除的就不能在更新
    await dao.update(updateJson, whereJson)

    await dao.delete(post.email)

    return ctx.return(STATUS.User.DELETE_SUCCESS, 'User deleted success!', {})
  } else {
    return ctx.return(STATUS.User.USER_NOT_EXIST, 'User is not existed!', {})
  }
})

module.exports = router.routes()
