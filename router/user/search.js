let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')
const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let post = ctx.request.body

  const { phone, email } = post

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
    return ctx.return(0, 'Search success', data)
  } else {
    return ctx.return(-1, "User isn't Found!", {})
  }
})

module.exports = router.routes()
