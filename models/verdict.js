// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2 sería mejor usar una constante definida con un nombre mas claro
const db = require('../db');


/**
 * Class that models the verdict of a problem processed by the judge
 * It is stored in the DB as a catalog
 */
class Verdict {
  /**
   * A method that initializes a Verdict object
   * @param {number} id   the unique number that identifies the verdict (system created)
   * @param {string} type the type of the verdict i.e. 'Failed to compile'
   */
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
  }


  /**
   * Returns all existing verdicts in the database
   * @return {Promise} returns an array containing all existing verdicts
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('Verdict', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Verdict(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns an element if it matches the request
   * @param  {number}  verdictId the unique id that identifies the element (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns an error
   */
  static async get(verdictId) {
    try {
      const data = await db.selectOne('Verdict', '', [{ attr: 'id', oper: '=', val: verdictId }]);
      return data.length !== 0 ? new Verdict(data[0]) : data;
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
      if (await db.insert('Verdict', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates an element if it matches request
   * @return {Promise} returns 0 if the element was updated,
   *                           1 if it failed
   * @throws {event}   returns an error
   */
  async update() {
    try {
      if (this.id !== undefined && await db.update('Verdict', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Deletes an element if it matches the request
   * @return {Promise} returns a 0 if the verdict is deleted,
   *                             1 if the verdict could not be deleted,
   *                             2 if it can't be found
   * @throws {event}   returns an error
   */
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Verdict', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the verdict if it exists,
   *                           an empty array if it fails
   * @throws {event}   returns an error
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('Verdict', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Verdict;
