const connectionPool = require('../../connection')

class UserService {
  async getUserByUsername(username) {
    const statement = 'SELECT * FROM `user` WHERE `username` = ?;'
    const result = await connectionPool.execute(statement, [username])
    return result[0]
  }

  async create(user) {
    const statement =
      'INSERT INTO `user` ( `username`, `password` ) VALUES ( ?, ? );'
    const { username, password } = user
    const result = await connectionPool.execute(statement, [username, password])
    return result[0]
  }
}

module.exports = new UserService()
