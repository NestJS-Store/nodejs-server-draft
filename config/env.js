let env = {
  dev: {
    mysql: {
      logging: true, // 是否打印数据库查询日志
      databaseName: 'test',
      username: 'root',
      password: '123456',
      host: '10.96.89.168',
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
      databaseName: '',
      username: '',
      password: '',
      host: '',
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

if (process.env.NODE_ENV == 'develop') {
  cfg = env.dev
  console.log('测试环境配置')
} else {
  cfg = env.online // 默认为线上环境，简化线上服务器的配置
  console.log('线上环境配置')
}

module.exports = cfg
