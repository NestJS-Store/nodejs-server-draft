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

  // 删除
  delete: async function(phone = null) {
    let data = await model.destroy({
      where: {
        phone: phone
      },
      logging: env.logging
    })
    return data
  },

  // 更新
  update: async function(updateJson = {}, whereJson = {}) {
    let data = await model.update(updateJson, {
      where: whereJson,
      logging: env.logging
    })
    return data
  },

  // 搜索
  search: async function(whereJson = {}) {
    let data = await model.findOne({
      where: whereJson
    })
    return data
  },

  // 分页
  list: async function(whereJson = {}, page = 1, pageSize = 10) {
    let data = await model.findAndCountAll({
      logging: env.logging,
      where: whereJson,
      offset: pageSize * (page - 1),
      limit: pageSize
    })

    console.info('data', data)
    return data
  },

  all: async function(whereJson = {}) {
    let data = await model.findAndCountAll({
      logging: env.logging,
      where: whereJson
    })
    return data
  },

  sum: async function(column, whereJson) {
    let data = await model.sum(column, {
      where: whereJson
    })
    return data
  },

  count: async function() {
    let data = await model.count({
      logging: env.logging
    })
    return data
  },

  increment: async function(columnArray = [], whereJson = {}, by = 1) {
    let data = await model.increment(columnArray, {
      by: by,
      where: whereJson
    })
    return data
  }
}

module.exports = dao
