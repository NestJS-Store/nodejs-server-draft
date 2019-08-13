/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-12 17:35:57
 */

const STATUS = require('../../status/index');

let path = require('path')
let router = require('koa-router')()

let md5 = require('../../utils/lib/md5');

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let post = ctx.request.body

  const { email, password, name } = post

  const exist = await dao.search({email})

  let data = {}

  // 校验 邮箱 和 电话 作为唯一标识
  if (exist) {

    return ctx.return(STATUS.User.USER_EXIST, 'User is Exist!', {})

  } else {

    data = await dao.add({
      email: email,
      name,
      password: md5(password)
    })

  }

  return ctx.return(STATUS.User.CREATE_SUCCESS, 'User added success', data)
})

module.exports = router.routes()
