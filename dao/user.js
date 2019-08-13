/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-13 11:03:37
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
      logging: env.logging
    })
    return data
  },

  // 搜索
  search: async function(whereJson = {}) {
    console.info(whereJson)
    let data = await model.findOne({
      where: whereJson
    })
    console.info(data)

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

    return data
  },

  // 搜索所有
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
