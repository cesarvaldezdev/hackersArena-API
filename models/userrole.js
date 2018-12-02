// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2
// sería mejor usar una constante definida con un nombre mas claro


const db = require('../db');

/**
 * Class that stores all user data required to sign up for HackersArena
 */
class UserRole {
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
    aliasUser, idRole,
  }) {
    this.aliasUser = aliasUser;
    this.idRole = idRole;
  }


  /**
   * Returns all existing users in the database
   * @return {Promise} returns an array containing all existing userAlias
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('UserRoles', '', '', 'aliasUser', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new UserRole(res));
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
  static async get(aliasUser) {
    try {
      const data = await db.selectAll('UserRoles', '', [{ attr: 'aliasUser', oper: '=', val: `'${aliasUser}'` }], 'aliasUser', true, 20, 0);
      if(data.length !== 0){
        const result = [];
        data.forEach((res) => {
          result.push(new UserRole(res));
        });
        return result;
      }
      return data;
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
      if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.aliasUser}'` }])).length !== 0) {
        if ((await db.selectOne('Role', '', [{ attr: 'id', oper: '=', val: this.idRole }])).length !== 0) {
          if (await db.insert('UserRoles', this)) return 0;
          return 1;
        } return 3;
      } return 2;
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
      if (this.idRole !== undefined && this.aliasUser !== undefined && (await this.exists()).length !== 0) {
        if (await db.delete('UserRoles', [
          {attr: 'aliasUser', oper: '=', val: `'${this.aliasUser}'`},
          {logic: 'and', attr: 'idRole', oper: '=', val: this.idRole },
        ]) !== undefined) return 0;
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
        const result = await db.selectOne('UserRoles', '', [
          {attr: 'aliasUser', oper: '=', val: `'${this.aliasUser}'`},
          {logic: 'and', attr: 'idRole', oper: '=', val: this.idRole },
        ]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserRole;
