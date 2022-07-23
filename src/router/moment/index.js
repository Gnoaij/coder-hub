const Router = require('@koa/router')

const { tokenVerify } = require('../../middleware')
const momentController = require('../../controller/moment')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.get('/:id', momentController.getMomentById)

momentRouter.post('/', tokenVerify(), momentController.create)

module.exports = momentRouter
