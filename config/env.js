let env = {
  dev: {
    mysql: {
      logging: true, // 是否打印数据库查询日志
      dbname: '',
      username: '',
      password: '',
      host: '',
      port: 3306,
      baseUrl: ''
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
      dbname: '',
      username: '',
      password: '',
      host: '',
      port: 3306,
      baseUrl: ''
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

if (process.env.NODE_ENV == 'develop') {
  cfg = env.dev
  console.log('测试环境配置')
} else {
  cfg = env.online // 默认为线上环境，简化线上服务器的配置
  console.log('线上环境配置')
}

module.exports = cfg
