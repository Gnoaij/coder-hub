const userService = require('../../service/user')

class UserController {
  async create(ctx) {
    const { request, response } = ctx
    const exist = await userService.getUserByUsername(request.body.username)
    if (exist.length > 0) {
      ctx.throw(409, '用户名已存在')
    }
    const result = await userService.create(request.body)
    response.status = 200
    response.body = {
      data: result,
      message: '用户注册成功'
    }
  }
}

module.exports = new UserController()
