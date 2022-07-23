const momentService = require('../../service/moment')

class MomentController {
  async getMomentById(ctx) {
    const { request, response } = ctx
    const result = await momentService.getMomentById(request.params.id)
    response.status = 200
    response.body = {
      data: result,
      message: '查询动态成功'
    }
  }

  async create(ctx) {
    const { request, response } = ctx
    const moment = {
      content: request.body.content,
      userId: request.body._tokenVerifyResult.id
    }
    const result = await momentService.create(moment)
    response.status = 200
    response.body = {
      data: result,
      message: '发表动态成功'
    }
  }
}

module.exports = new MomentController()
