const pool = require('./../pool');
const toCamelCase = require('./utils/to-camelCase');

class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');
    return toCamelCase(rows);
  }

  // always get user data only through prepared sql statement
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE users.id = $1',
      [id]
    );
    return toCamelCase(rows)[0];
  }

  static async insert(bio, username) {
    const { rows } = await pool.query(
      'INSERT INTO users (bio, username) VALUES ($1,$2) RETURNING *;',
      [bio, username]
    );

    return toCamelCase(rows)[0];
  }

  static async update(id, bio, username) {
    const { rows } = await pool.query(
      'UPDATE users SET username = $1, bio = $2 WHERE users.id = $3 RETURNING *;',
      [username, bio, id]
    );

    return toCamelCase(rows)[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE users.id = $1 RETURNING *;',
      [id]
    );

    return toCamelCase(rows)[0];
  }
}

module.exports = UserRepo;
