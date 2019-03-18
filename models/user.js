var path = require('path')
let sequelize = require('../config/sequelize')
const env = require('../config/env')

const force = env.mysql.forceUpdateModel

const modelName = path.basename(__filename, '.js')

const model = sequelize.define(
  modelName,
  {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户Id 自动生成'
    },

    phone: {
      type: sequelize.Sequelize.BIGINT,
      comment: '手机号',
      // unique: true
    },

    name: {
      type: sequelize.Sequelize.TEXT,
      comment: '用户名'
    },

    password: {
      type: sequelize.Sequelize.STRING,
      comment: '密码'
    },

    status: {
      type: sequelize.Sequelize.INTEGER,
      comment: '0为默认状态',
      defaultValue: 0
    },
    email: {
      type: sequelize.Sequelize.TEXT,
      comment: '用户邮箱',
      default: null
    },
    created: {
      defaultValue: sequelize.Sequelize.NOW,
      type: sequelize.Sequelize.DATE,
      comment: '用户的创建时间'
    },
  },
  {
    underscored: true,
    freezeTableName: true,
    paranoid: true
  },
)

/*
* FIXME: 强制更新 table 
*/

model.sync({force: false }).then(() => {
  console.info('user sync success!')
})

module.exports = model
