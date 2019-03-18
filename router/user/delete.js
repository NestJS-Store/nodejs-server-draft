let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let get = ctx.request.query
  let post = ctx.request.body

  const isExisted = await dao.search({ phone: post.phone})

  console.info('isExisted', isExisted)

  if (isExisted) {
    let data = await dao.delete(post.phone)
    return ctx.return(0, '', data)
  } else {
    return ctx.return(0, '', {
      message: 'User Is Not Existed!'
    })
  }

})

module.exports = router.routes()
