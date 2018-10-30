// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2
// sería mejor usar una constante definida con un nombre mas claro


const db = require('../db');


/**
 * Class that stores the data of a solution to a problem
 */
class Solution {
  /**
   * Method that initializes a Solution object
   * @param {number} id         the unique number that identifies the solution (system created)
   * @param {date}   date       the date in which the solution was last modified
   * @param {number} userId     the id of the user who update the solution
   * @param {number} idProblem  the id of the problem that the solution solves
   * @param {number} idVerdict  the results after testing the solution (catalog)
   * @param {number} time       the time needed for the execution
   * @param {number} memory     the memory needed for the solution
   * @param {number} size       the size of the solution
   * @param {number} idLanguage the language for the solution
   */
  constructor({
    id, date, time, memory, size, aliasUser, idProblem, idLanguage, idVerdict,
  }) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.memory = memory;
    this.size = size;
    this.aliasUser = aliasUser;
    this.idProblem = idProblem;
    this.idLanguage = idLanguage;
    this.idVerdict = idVerdict;
  }


  /**
   * Returns all existing solutions in the database
   * @return {Promise} returns an array containing all existing solutions
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('Solution', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Solution(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns an element if it matches the request
   * @param  {number}  solutionId the unique id that identifies the solution (param in the url)
   * @return {Promise}            returns the requested object
   * @throws {event}              returns the error
   */
  static async get(solutionId) {
    try {
      const data = await db.selectOne('Solution', '', [{ attr: 'id', oper: '=', val: solutionId }]);
      return data.length !== 0 ? new Solution(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element that matches request, if none match, it creates it
   * @return {Promise} returns 0 if the solution was saved,
   *                           1 if it failed,
   *                           2 if the problem was not found,
   *                           3 if the language was not found,
   *                           4 if the user was not found,
   *                           5 if the verdict was not found
   * @throws {event}   returns the error
   */
  async save() {
    try {
      if ((await db.selectOne('Verdict', '', [{ attr: 'id', oper: '=', val: this.id_Verdict }])).length !== 0) {
        if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.alias_User}'` }])).length !== 0) {
          if ((await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: this.id_Problem }])).length !== 0) {
            if ((await db.selectOne('Language', '', [{ attr: 'id', oper: '=', val: this.id_Language }])).length !== 0) {
              if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
              if (await db.insert('Solution', this)) return 0;
              return 1; // Can't be saved
            } return 3; // Language does not exist
          } return 2; // Problem does not exist
        } return 4; // User does not exist
      } return 5; // Verdict does not exist
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates an element if it matches request
   * @return {Promise} returns 0 if it the solution was updated,
   *                           1 if it failed
   * @throws {event}   returns the error
   */
  async update() {
    try {
      if (this.id !== undefined && await db.update('Solution', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Deletes an element if it matches the request
   * @return {Promise} returns 0 if the solution is deleted,
   *                           1 if it failed,
   *                           2 if it was not found
   * @throws {event}   returns the error
   */
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Solution', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the solution if it exists,
   *                   an empty array if it fails
   * @throws {event}   returns the error
   */
  async exists() {
    try {
      if (this.alias !== undefined) {
        const result = await db.selectOne('Solution', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Solution;
