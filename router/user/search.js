let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')
const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname))

router.get('/', async function(ctx, next) {

  // Get 请求在 ctx.request.query 对象上面
  let body = ctx.request.query

  const { phone, email } = body

  let whereJson = {}
  if (phone) {
    whereJson = {
      phone: {
        [Op.like]: '%' + phone + '%'
      }
    }
  } else if (email) {
    whereJson = {
      email: {
        [Op.like]: '%' + email + '%'
      }
    }
  } else {
    return ctx.return(-1, 'User Search Query Is Not Valid!', {})
  }

  let data = await dao.search(whereJson)

  if(data) {
    ctx.sessions = {
      name: 'id'
    }
    return ctx.return(0, 'Search success', data)
  } else {
    return ctx.return(-1, "User isn't Found!", {})
  }
})

module.exports = router.routes()
