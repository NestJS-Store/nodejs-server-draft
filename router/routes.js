/*
 * @LastEditors: Magic RVya (Jia Wei Ya)
 * @LastEditTime: 2019-08-12 13:33:38
 */
let routes = function(router) {
  // 定义控制器的路由映射
  // 为什么不用文件遍历自动映射？
  // 为了安全，要对每一个暴露出来的接口，都要手动加，这样才有印象，否则，未做校验的 delete 接口可能就会自动暴露出来了
  let controller = {
    // ****** user 常用接口，登录，注册，查询，更新资料，修改密码 ******
    '/api/login': './user/login',
    '/api/user/reg': './user/reg',
    '/api/user/list': './user/list',
    '/api/user/update': './user/update',
    '/api/user/search': './user/search',
    '/api/user/modpwd': './user/modpwd',
    '/api/user/add': './user/add',
    '/api/user/delete': './user/delete',

    // ****** utils 常用接口，数据库备份 ******
    '/utils/db_backup': './utils/db_backup',

    // ****** book 以下为8个标准接口，增删改查，自增、计数、求和、模糊搜索，以下接口绝大部分可以完全复用或者稍作修改后复用 ******
    '/api/book/add': './book/add',
    '/api/book/delete': './book/delete',
    '/api/book/update': './book/update',
    '/api/book/list': './book/list', // 默认有分页功能
    '/api/book/all': './book/all', // 默认列出全部
    '/api/book/increment': './book/increment',
    '/api/book/count': './book/count',
    '/api/book/sum': './book/sum',

    // 以下两个接口需要自定义修改，复用非常简单
    '/api/book/list_with_author': './book/list_with_author', // 这个接口做关联查询，需要研究明白，然后所有的关联查询就非常的轻松
    '/api/book/search': './book/search', // 模糊搜索接口，需要设置搜索字段
    '/api/book/sale_an_author_book': './book/sale_an_author_book'
  }
  for (x in controller) {
    router.use(x, require(controller[x]))
  }
}

module.exports = routes
