const mysql = require('mysql2')

const config = require('../config')

const connectionPool = mysql
  .createPool({
    user: config.CONNECTION_USER,
    password: config.CONNECTION_PASSWORD,
    host: config.CONNECTION_HOST,
    port: config.CONNECTION_PORT,
    database: config.CONNECTION_DATABASE
  })
  .promise()

// /**
//  * 测试连接
//  */
// connectionPool
//   .getConnection()
//   .then((conn) => {
//     return conn.connect()
//   })
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch((err) => {
//     console.warn('数据库连接失败', err)
//   })

module.exports = connectionPool
