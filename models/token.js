const db = require('../db');


/**
 * Class that models the token that authenticates sessions
 */
class Token {
  /**
   * Method that initializes the Token object
   * @param {number} id        the unique number that identifies the solution (system created)
   * @param {string} token     [description]
   * @param {string} createdAt [description]
   * @param {Date} expires   [description]
   * @param {string} type      the type of the
   * @param {number} status    the status of the token: 1 if active, 0 if inactive
   * @param {string} aliasUser the alias of the user the token belongs
   */
  constructor(id, token, createdAt, expires, type, status, aliasUser) {
    this.id = id;
    this.token = token;
    this.createdAt = createdAt;
    this.expires = expires;
    this.type = type;
    this.status = status;
    this.aliasUser = aliasUser;
  }


  /**
   * Changes a token status to inactive
   * Modifies the token in the database
   * @return {Promise} [description]
   */
  async deactive() {
    this.active = false;
    try {
      if (this.id !== undefined && await db.update('Solution', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Gets a token from the database
   * @param  {[type]} token [description]
   * @return {[type]}       [description]
   */
  static async get(tokenId) {
    try {
      const data = await db.selectOne('Token', '', [{ attr: 'id', oper: '=', val: tokenId }]);
      return data.length !== 0 ? new Token(data[0]) : data;
    } catch (e) {
      throw e;
    }
    // Go to the database and get the token that matches with the one here
    //
    // db.get();
  }
}


module.exports = new Token();
