/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 10:55:58
 */
let path = require('path')
let router = require('koa-router')()
let Sequelize = require('sequelize')
const Op = Sequelize.Op

const STATUS = require('../../status/index');

let dao = require('../../dao/' + path.basename(__dirname))

router.post('/', async function(ctx, next) {
  let get = ctx.request.query
  let post = ctx.request.body

  console.info(post.email)


  whereJson = {
    email: post.email
  }

  const isExisted = await dao.search(whereJson)

  console.info(isExisted)
  if (isExisted) {

    const whereJson = {
      email: post.email,
    }

    const updateJson = {
      status: -1,
    }

    // // 删除的就不能在更新
    // await dao.update(updateJson, whereJson)

    // await dao.delete(post.email)

    return ctx.return(STATUS.User.DELETE_SUCCESS, 'User deleted success!', {})
  } else {
    return ctx.return(STATUS.User.USER_NOT_EXIST, 'User is not existed!', {})
  }
})

module.exports = router.routes()
