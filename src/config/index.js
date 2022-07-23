const path = require('path')
const fs = require('fs')

const dotenv = require('dotenv')

const config = dotenv.config({ path: '.env.local' }).parsed

const private_key = fs.readFileSync(
  path.resolve(__dirname, './rsa_private_key.pem')
)
const public_key = fs.readFileSync(
  path.resolve(__dirname, './rsa_public_key.pem')
)

module.exports = {
  ...config,
  PRIVATE_KEY: private_key,
  PUBLIC_KEY: public_key
}
