// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2
// sería mejor usar una constante definida con un nombre mas claro


const db = require('../db');


/**
 * Class that models every coding problem
 */
class Problem {
  /**
   * Method that initializes a Problem object
   * @param {number} id         the unique number that identifies the problem (system created)
   * @param {number} idDoc      the id of the document
   * @param {number} testTime   the time the test took
   * @param {number} testMemory the memory used in test
   * @param {number} attempts   the number of attempts the user has made
   * @param {number} solved     the number that states if problem was solved (1 true, 0 false)
   * @param {string} aliasUser  the alias of the user that created the problem
   * @param {number} idCategory the id of the category the problem belongs to
   */
  constructor({
    id, docId, testTime, testMemory, attempts, solved, aliasUser, idCategory,
  }) {
    this.id = id;
    this.idDoc = docId;
    this.testTime = testTime;
    this.testMemory = testMemory;
    this.attempts = attempts;
    this.solved = solved;
    this.aliasUser = aliasUser;
    this.idCategory = idCategory;
  }


  /**
   * Returns all existing verdicts in the database
   * @return {Promise} returns an array containing all existing verdicts
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('Problem', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Problem(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns an element if it matches the request
   * @param  {number}  problemId the unique id that identifies the element (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns an error
   */
  static async get(problemId) {
    try {
      const data = await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: problemId }]);
      return data.length !== 0 ? new Problem(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element that matches request, if none match, it creates it
   * @return {Promise} returns 0 if it exists
   *                           1 if it failed,
   *                           2 if user was not found,
   *                           3 if category was not found
   * @throws {event}   returns an error
   */
  async save() {
    try {
      if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.alias_User}'` }])).length !== 0) {
        if ((await db.selectOne('Category', '', [{ attr: 'id', oper: '=', val: this.id_Category }])).length !== 0) {
          if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('Problem', this)) return 0;
          return 1;
        } return 3;
      } return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates an element if it matches request
   * @return {Promise} returns 0 if the problem was updated,
   *                           1 if it failed
   * @throws {event}   returns an error
   */
  async update() {
    try {
      if (this.id !== undefined && await db.update('Problem', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Deletes an element if it matches the request
   * @return {Promise} returns a 0 if the problem is deleted,
   *                             1 if the problem could not be deleted,
   *                             2 if it can't be found
   * @throws {event}   returns an error
   */
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Problem', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the problem if it exists,
   *                           an empty array if it fails
   * @throws {event}   returns an error
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Problem;
