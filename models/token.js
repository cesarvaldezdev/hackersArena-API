const db = require('../db');
/**
 * This class manages the tokens that we will create at every session,
 * if the user wants to registrate or if the user need to recover a password.
 */
class Token {
  /**
   * Constructor of the token
   * @param {string} token         [Our token]
   * @param {date} createdAt     [date of the token]
   * @param {number} expires       [when the token expires]
   * @param {string} type          [type of the token]
   * @param {number} status        [status of the token, 1=active 0= not active]
   * @param {string} aliasUser       [id of the user of the token]
   */
  constructor({
    id, token, createdAt, expires, type, status, aliasUser,
  }) {
    this.id = id;
    this.token = token;
    this.createdAt = createdAt;
    this.expires = expires;
    this.type = type;
    this.status = status;
    this.aliasUser = aliasUser;
  }

  // Regresa un token
  static async get(token) {
    try {
      const data = await db.selectOne('Token', '', [{ attr: 'token', oper: '=', val: token }]);
      if (this.expires + this.createdAt < new Date().now) {
        return data.length !== 0 ? new Token(data[0]) : data;
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  // Regresa todos los Token
  static async getAll() {
    try {
      const data = await db.selectAll('Token', '', '', 'createdAt', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Token(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  //  Guardar un token
  async save() {
    try {
      if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.aliasUser}'` }])).length !== 0) {
        if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
        if (await db.insert('Token', this)) return 0;
        return 1; // Mo se pudo guardar
      } else return 2; // No existe el usuario
    } catch (e) {
      throw e;
    }
  }

  // Elimina un token
  async delete() {
    try {
      if (this.token !== undefined && (await this.exists()).length !== 0) {
        if (this.token !== undefined && await db.delete('Token', [{ atrr: 'token', oper: '=', val: this.token }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }

  // Verifica que el token exista
  async exists() {
    try {
      if (this.token !== undefined) {
        const result = await db.selectOne('Token', '', [{ attr: 'id', oper: '=', val: this.token }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Token;
