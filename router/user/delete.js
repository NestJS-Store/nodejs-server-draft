let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')
const Op = Sequelize.Op

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let get = ctx.request.query
  let post = ctx.request.body

  const isExisted = await dao.search({
      phone: {
        [Op.like]: '%' + post.phone + '%'
      }
    })

  if (isExisted) {

    const whereJson = {
      phone: post.phone,
    }

    const updateJson = {
      status: -1,
    }

    // 删除的就不能在更新
    await dao.update(updateJson, whereJson)

    await dao.delete(post.phone)

    return ctx.return(0, 'User deleted success!', {})
  } else {
    return ctx.return(-1, 'User is not existed!', {})
  }
})

module.exports = router.routes()
