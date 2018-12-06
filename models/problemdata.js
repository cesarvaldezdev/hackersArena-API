

const db = require('../db');


/**
 * Class that models every coding problem
 */
class ProblemData {

  constructor({
    idProblem, description, test, output,
  }) {
    this.idProblem = idProblem;
    this.description = description;
    this.test = test;
    this.output = output;
  }


  /**
   * Returns all existing verdicts in the database
   * @return {Promise} returns an array containing all existing verdicts
   * @throws {event}   returns the error
   */
  // static async getAll(ini,fin) {
  //   try {
  //     const data = await db.selectAll('Problem', '', '', 'id', true, fin, ini);
  //     const response = [];
  //     data.forEach((res) => {
  //       response.push(new Problem(res));
  //     });
  //     return response;
  //   } catch (e) {
  //     throw e;
  //   }
  // }


  /**
   * Returns an element if it matches the request
   * @param  {number}  problemId the unique id that identifies the element (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns an error
   */
  static async get(problemId) {
    try {
      const data = await db.selectOne('ProblemData', '', [{ attr: 'idProblem', oper: '=', val: problemId }]);
      return data.length !== 0 ? new ProblemData(data[0]) : data;
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
      if ((await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: this.idProblem }])).length !== 0) {
          if (this.idProblem !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('ProblemData', this)) return 0;
          return 1;
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
      if (this.idProblem !== undefined && await db.update('ProblemData', this, [{ attr: 'idProblem', oper: '=', val: this.idProblem }])) return 0;
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
      if (this.idProblem !== undefined && (await this.exists()).length !== 0) {
        if (this.idProblem !== undefined && await db.delete('ProblemData', [{ attr: 'idProblem', oper: '=', val: this.idProblem }]) !== undefined) return 0;
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
      if (this.idProblem !== undefined) {
        const result = await db.selectOne('ProblemData', '', [{ attr: 'idProblem', oper: '=', val: this.idProblem }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = ProblemData;
