let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let get = ctx.request.query
  let post = ctx.request.body


  const { phone, email } = post

  const existPhone = await dao.search({phone})
  const existEmail = await dao.search({email})

  let data = {}
  if (existPhone || existEmail) {
      data = {
        code: '-1',
        message: 'User is Exist!'
      }
  } else {
    data = await dao.add(post)
  }

  return ctx.return(0, '', data)
})

module.exports = router.routes()
