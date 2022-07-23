const jwt = require('jsonwebtoken')

const userService = require('../../service/user')
const config = require('../../config')

class AuthController {
  async login(ctx) {
    const { request, response } = ctx
    const { username, password } = request.body
    const result = await userService.getUserByUsername(username)
    if (result.length === 0) {
      ctx.throw(400, '用户名不存在')
    }
    const user = result[0]
    if (user.password !== password) {
      ctx.throw(400, '密码错误')
    }
    const { id } = user
    const token = jwt.sign({ id, username }, config.PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 24 * 7
    })

    response.status = 200
    response.body = {
      data: {
        id,
        username,
        token
      },
      message: '登录成功'
    }
  }

  async verify(ctx) {
    const { request, response } = ctx
    response.status = 200
    response.body = {
      data: request.body._tokenVerifyResult,
      message: '授权有效'
    }
  }
}

module.exports = new AuthController()
