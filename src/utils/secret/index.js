const crypto = require('crypto')

function encrypt(data, algorithm, key) {
  const hmac = crypto.createHmac(algorithm, key)
  const result = hmac.update(data).digest('hex')
  return result
}

module.exports = {
  encrypt
}
