/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 19:23:06
 */

const STATUS = require('../../status/index');

let path = require('path')
let router = require('koa-router')()

let md5 = require('../../utils/lib/md5');

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {

  let post = ctx.request.body

  const { email, password, name } = post

  const existedUser = await dao.search({email})

  let data = {}

  // 校验 邮箱 唯一标识
  if (existedUser) {

    return ctx.return(STATUS.User.USER_EXIST, 'User is Exist!', data)

  } else {

    data = await dao.add({
      email,
      name,
      password: md5(password)
    })
  }

  return ctx.return(STATUS.User.CREATE_SUCCESS, 'User added success!', data)

})

module.exports = router.routes()
