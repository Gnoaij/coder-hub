const jwt = require('jsonwebtoken')

const config = require('../config')
const secret = require('../utils/secret')

function errorHandler() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      const { response } = ctx
      response.status = error.status || error.statusCode || 500
      if (response.status !== 500) {
        response.body = {
          message: error.message
        }
      } else {
        console.warn('----------error handler----------')
        console.warn(error.message)
        console.warn('---------------------------------')
      }
    }
  }
}

function tokenVerify() {
  return async (ctx, next) => {
    const { request } = ctx
    const authorization = request.headers.authorization
    if (!authorization) {
      ctx.throw(401, '无效的token')
    }
    const token = authorization.replace(/^Bearer\s/, '')
    try {
      const result = jwt.verify(token, config.PUBLIC_KEY, {
        algorithm: ['RS256']
      })
      request.body._tokenVerifyResult = result
    } catch (error) {
      ctx.throw(401, '无效的token')
    }
    await next()
  }
}

function required(field, status, message) {
  return async (ctx, next) => {
    const data = ctx.request.body[field]
    if (data == null || data === '') {
      ctx.throw(status, message)
    } else {
      await next()
    }
  }
}

function encrypt(field, algorithm, key) {
  return async (ctx, next) => {
    const data = ctx.request.body[field]
    const result = secret.encrypt(data, algorithm, key)
    ctx.request.body[field] = result
    await next()
  }
}

module.exports = {
  errorHandler,
  tokenVerify,
  required,
  encrypt
}
