const db = require('../db');

/**
 * Class that stores all user data required to sign up for HackersArena
 */
class User {
  /**
   * Method that initializes a User object
   * @param {string} alias        a unique string that identifies the user (user created)
   * @param {string} name         the given name of the user
   * @param {string} lastName     the family name of the user
   * @param {number} score        the current score that the user has (leaderboard)
   * @param {string} email        the primary email of the user account
   * @param {string} password     the password of the account (stored encrypted)
   * @param {number} idUniversity the id of the University that the user belongs to
   * @param {number} idCountry    the if of country of residence of the user
   */
  constructor({
    alias, name, lastName, score, email, password, idUniversity, idCountry,
  }) {
    this.alias = alias;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.score = score;
    this.password = password;
    this.idUniversity = idUniversity;
    this.idCountry = idCountry;
  }


  /**
   * Returns all existing users in the database
   * @return {Promise} returns an array containing all existing userAlias
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('User', '', '', 'alias', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new User(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns a single element that matches request
   * @param  {[type]}  userAlias the unique string that identifies the user (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns the error
   */
  static async get(userAlias) {
    try {
      const data = await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${userAlias}'` }]);
      return data.length !== 0 ? new User(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element in the table if it already exists, otherwise it creates it
   * @return {Promise} returns 0 if the user was saved,
   *                           1 if it failed,
   *                           2 if the country was not found,
   *                           3 if the university was not found,
   * @throws {event}   returns the error
   */
  async save() {
    try {
      if ((await db.selectOne('Country', '', [{ attr: 'id', oper: '=', val: this.idCountry }])).length !== 0) {
        if ((await db.selectOne('University', '', [{ attr: 'id', oper: '=', val: this.idUniversity }])).length !== 0) {
          if (this.alias !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('User', this)) return 0;
          return 1;
        } return 3;
      } return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element
   * @return {Promise} returns 0 if was updated,
   *                           1 if it failed
   * @throws {event}   returns an error
   */
  async update() {
    try {
      if (this.alias !== undefined && await db.update('User', this, [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Deletes the element in the table by id
   * @return {Promise} returns 0 if the user is deleted,
   *                           1 if it failed,
   *                           2 if it can't be found
   * @throws {event}   returns the error
   */
  async delete() {
    try {
      if (this.alias !== undefined && (await this.exists()).length !== 0) {
        if (this.alias !== undefined && await db.delete('User', [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns user if it exists,
   *                           an empty array if it failed
   * @throws {event} returns the error
   */
  async exists() {
    try {
      if (this.alias !== undefined) {
        const result = await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = User;
