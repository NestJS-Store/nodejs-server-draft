let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')
const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let post = ctx.request.body

  const { phone, email } = post

  const isExisted = {
    code: '-1',
    message: 'User Search Query Is Not Valid!'
  }

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
    return ctx.return(0, '', isExisted)
  }

  let data = await dao.search(whereJson)

  return ctx.return(0, '', data)
})

module.exports = router.routes()
