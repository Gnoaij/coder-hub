const fs = require('fs')

class uploadController {
  async save(ctx) {
    const { request, response } = ctx
    const file = request.file
    if (!file) {
      ctx.throw(400, '请指定文件')
    }
    const filePath = file.destination + file.filename
    const fileBuffer = await fs.promises.readFile(filePath)
    response.status = 200
    response.type = file.mimetype
    response.body = fileBuffer
  }
}

module.exports = new uploadController()
