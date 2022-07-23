const Router = require('@koa/router')

const { required, encrypt } = require('../../middleware')
const userController = require('../../controller/user')
const config = require('../../config')

const userRouter = new Router({ prefix: '/user' })

userRouter.post(
  '/',
  required('username', 400, '用户名不能为空'),
  required('password', 400, '密码不能为空'),
  encrypt('password', 'md5', config.SECRET_KEY),
  userController.create
)

module.exports = userRouter
