const Router = require('@koa/router')

const { tokenVerify, required, encrypt } = require('../../middleware')
const authController = require('../../controller/auth')
const config = require('../../config')

const authRouter = new Router({ prefix: '/auth' })

authRouter.post(
  '/login',
  required('username', 400, '用户名不能为空'),
  required('password', 400, '密码不能为空'),
  encrypt('password', 'md5', config.SECRET_KEY),
  authController.login
)

authRouter.get('/verify', tokenVerify(), authController.verify)

module.exports = authRouter
