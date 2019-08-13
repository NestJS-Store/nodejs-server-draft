/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 20:16:28
 */
let Sequelize = require('sequelize')
let path = require('path')
let env = require('../config/env')

let model = require('../models/' + path.basename(__filename, '.js'))

let dao = {
  // 增加
  add: async function(addJson) {
    let data = await model.create(addJson, {
      logging: env.logging
    })
    return data
  },

  // 批量增加
   batchCreate: async function(users) {
    let data = await model.bulkCreate(users, {
      logging: env.logging
    })
    return data
  },

  // 删除
  delete: async function(email = null) {
    let data = await model.destroy({
      where: {
        email: email
      },
      logging: env.logging
    })
    return data
  },

  // 更新
  update: async function(updateJson = {}, whereJson = {}) {
    let data = await model.update(updateJson, {
      where: whereJson,
      logging: env.logging,
      attributes: {
        exclude: ['password', 'created_at', 'deleted_at', 'updated_at', 'status' ]
      }
    })
    return data
  },

  // 查找
  search: async function(whereJson = {}, needPass = false) {

    const exclude = needPass ? ['password'] : []

    let data = await model.findOne({
      where: whereJson,
      attributes: {
        exclude: exclude
      }
    })
    return data
  },

  // 分页
  list: async function(whereJson = {}, page = 1, pageSize = 10) {
    let data = await model.findAndCountAll({
      logging: env.logging,
      where: whereJson,
      offset: pageSize * (page - 1),
      limit: pageSize,
      attributes: {
        exclude: ['password', 'created_at', 'deleted_at', 'updated_at', 'status' ]
      }
    })

    return data
  },

  // 模糊搜索
  all: async function(whereJson = {}) {
    let data = await model.findAndCountAll({
      logging: env.logging,
      where: whereJson
    })
    return data
  },

  // 求和
  sum: async function(column, whereJson) {
    let data = await model.sum(column, {
      where: whereJson
    })
    return data
  },

  // 统计
  count: async function() {
    let data = await model.count({
      logging: env.logging
    })
    return data
  },

  // 自增
  increment: async function(columnArray = [], whereJson = {}, by = 1) {
    let data = await model.increment(columnArray, {
      by: by,
      where: whereJson
    })
    return data
  }
}

module.exports = dao
