// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2
// sería mejor usar una constante definida con un nombre mas claro


const db = require('../db');

/**
 * Class that stores all user data required to sign up for HackersArena
 */
class RoleAllow {
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
    idRole, idAllow, status,
  }) {
    this.idRole = idRole;
    this.idAllow = idAllow;
    this.status = status;
  }


  /**
   * Returns all existing users in the database
   * @return {Promise} returns an array containing all existing userAlias
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('RoleAllows', '', '', 'idRole', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new RoleAllow(res));
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
  static async get(idRole) {
    try {
      const data = await db.selectAll('RoleAllows', '', [{ attr: 'idRole', oper: '=', val: idRole }], 'idRole', true, 20, 0);
      if(data.length !== 0){
        const result = [];
        data.forEach((res) => {
          result.push(new RoleAllow(res));
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
      if ((await db.selectOne('Allow', '', [{ attr: 'id', oper: '=', val: this.idAllow }])).length !== 0) {
        if ((await db.selectOne('Role', '', [{ attr: 'id', oper: '=', val: this.idRole }])).length !== 0) {
          if ((await this.exists()).length !== 0) return this.update();
          if (await db.insert('RoleAllows', this)) return 0;
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
      if (await db.update('RoleAllows', this, [
            { attr: 'idRole', oper: '=', val: this.idRole},
            { logic: 'and', attr: 'idAllow', oper:'=', val: this.idAllow},
          ])) return 0;
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
      if (this.idRole !== undefined && this.idAllow !== undefined && (await this.exists()).length !== 0) {
        if (await db.delete('RoleAllows', [
          { attr: 'idRole', oper: '=', val: this.idRole},
          { logic: 'and', attr: 'idAllow', oper:'=', val: this.idAllow},
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
      if (this.idAllow !== undefined && this.idRole !== undefined) {
        const result = await db.selectOne('RoleAllows', '', [
          { attr: 'idRole', oper: '=', val: this.idRole},
          { logic: 'and', attr: 'idAllow', oper:'=', val: this.idAllow},
        ]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = RoleAllow;
