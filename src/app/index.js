const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyparser = require('koa-bodyparser')

const { errorHandler } = require('../middleware')
const useRoutes = require('../router')
const config = require('../config')

const app = new Koa()

app.use(koaStatic('./uploads'))
app.use(bodyparser())
app.use(errorHandler())
useRoutes(app)

function start() {
  app.listen(config.APP_PORT, () => {
    console.log(
      'The server starting on: ' +
        '\033[34m' +
        `http://localhost:${config.APP_PORT}/` +
        '\033[0m'
    )
  })
}

module.exports = {
  start
}
