const path = require('path')
const fs = require('fs')

function useRoutes(app) {
  fs.readdirSync(__dirname, { withFileTypes: true }).forEach((file) => {
    if (file.isDirectory()) {
      const router = require(path.resolve(__dirname, file.name))
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  })
}

module.exports = useRoutes
