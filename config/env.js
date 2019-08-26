/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-14 17:24:26
 */
let env = {
  dev: {
    mysql: {
      logging: true, // 是否打印数据库查询日志
      databaseName: 'test',
      username: 'remote',
      password: '123456789',
      host: '39.106.163.208',
      port: 3306,
      baseUrl: '',

      // table is need to force rewrite
      forceUpdateModel: true

    },
    oss: {
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    },
    sms: {
      accessKeyId: '',
      secretAccessKey: '',
      TemplateCode: '',
      SignName: ''
    },
    redis: {
      port: 6379,
      host: '',
      family: 4,
      password: '',
      db: 1
    }
  },
  online: {
    mysql: {
      logging: false, // 是否打印数据库查询日志
      databaseName: 'miraclesDB',
      username: 'localhost',
      password: '123456789',
      host: '127.0.0.1',
      port: 3306,
      baseUrl: '',
      // table is need to force rewrite
     forceUpdateModel: false,
    },
    oss: {
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    },
    sms: {
      accessKeyId: '',
      secretAccessKey: '',
      TemplateCode: '',
      SignName: ''
    },
    redis: {
      port: 6379,
      host: '',
      family: 4,
      password: '',
      db: 1
    }
  }
}

let cfg = null

if (process.env.NODE_ENV == 'production') {
  cfg = env.online
  console.log('测试环境配置')
} else {
  cfg = env.dev // 默认为线上环境，简化线上服务器的配置
  console.log('线上环境配置')
}

module.exports = cfg
