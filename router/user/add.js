let path = require('path')
let router = require('koa-router')()


let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let post = ctx.request.body

  const { phone, email } = post

  const existPhone = await dao.search({phone})
  const existEmail = await dao.search({email})

  let data = {}

  // 校验 邮箱 和 电话 作为唯一标识
  if (existPhone || existEmail) {

    return ctx.return(-1, 'User is Exist!', {})

  } else {

    data = await dao.add(post)

  }

  return ctx.return(0, 'User added success', data)
})

module.exports = router.routes()
