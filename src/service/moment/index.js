const connectionPool = require('../../connection')

class MomentService {
  async getMomentById(id) {
    const statement = `
    SELECT
      m.id id,
      m.content content,
      JSON_OBJECT( 'id', u.id, 'username', u.username ) user,
      m.createAt createAt,
      m.updateAt updateAt
    FROM
      moment m
      LEFT JOIN user u ON m.userId = u.id
    WHERE
      m.id = ?
    ;
    `
    const result = await connectionPool.execute(statement, [id])
    return result[0]
  }

  async create(moment) {
    const statement =
      'INSERT INTO `moment` ( `content`, `userId` ) VALUES ( ?, ? );'
    const { content, userId } = moment
    const result = await connectionPool.execute(statement, [content, userId])
    return result[0]
  }
}

module.exports = new MomentService()
