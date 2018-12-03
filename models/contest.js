// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2 sería mejor usar
// una constante definida con un nombre mas claro

/*
 * THIS IS A MODEL IN PROGRESS
 */
const db = require('../db');


/**
 * Class that models a contest.
 */
class Contest {
  /**
   * Method that initializes a Contest object
   * @param {number} id         the unique number that identifies the contest (system created)
   * @param {string} name       the name of a contest
   * @param {date} start        the date in which a contest starts
   * @param {date} end          the date in which a contest ends
   * @param {string} type       the type of contest
   * @param {number} penalty    the penalty of a contest
   * @param {number} frozenTime the frozen time of a contest
   * @param {number} deadTime   the dead time of a contest
   * @param {array} medal       the medals of the contest
   */
  constructor({
    id, name, start, end, type, penalty, frozenTime, deadTime, medal,
  }) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.type = type;
    this.penalty = penalty;
    this.frozenTime = frozenTime;
    this.deadTime = deadTime;
    this.medal = medal;
  }


  /**
   * Returns all existing contests in the database
   * @return {Promise} returns an array containing all existing categories
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('Contest', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Contest(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns an element if it matches the request
   * @param  {number}  contestId the unique id that identifies the element (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns an error
   */
  static async get(contestId) {
    try {
      const data = await db.selectOne('Contest', '', [{ attr: 'id', oper: '=', val: contestId }]);
      return data.length !== 0 ? new Contest(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element that matches request, if none match, it creates it
   * @return {Promise} returns 0 if it exists
   *                           1 if it failed
   * @throws {event}   returns an error
   */
  async save() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Contest', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Deletes an element if it matches the request
   * @return {Promise} returns a 0 if the contest is deleted,
   *                             1 if the contest could not be deleted,
   *                             2 if it can't be found
   * @throws {event}   returns an error
   */
  async update() {
    try {
      if (this.id !== undefined && await db.update('Contest', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the contest if it exists,
   *                           an empty array if it fails
   * @throws {event}   returns an error
   */
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Contest', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Contest;
