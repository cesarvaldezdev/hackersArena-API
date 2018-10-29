// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2
// sería mejor usar una constante definida con un nombre mas claro


const db = require('../db');


/**
 * Class that models a university a user may represent
 * It is stored in the database as a catalog
 */
class University {
  /**
   * Method that initializes a University object
   * @param {number} id        the unique number that identifies the university (system created)
   * @param {string} name      the name of the university
   * @param {number} idCountry the id of the country the university belongs to
   * @param {number} idLogo    the id of the university logo
   */
  constructor({
    id, name, idCountry, idLogo,
  }) {
    this.id = id;
    this.name = name;
    this.idLogo = idLogo;
    this.idCountry = idCountry;
  }


  /**
   * Returns all existing universities in the database
   * @return {Promise} returns an array containing all universities
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('University', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new University(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns an element if it matches the request
   * @param  {[type]}  universityId the unique id that identifies the element (param in the url)
   * @return {Promise}              returns the requested object
   * @throws {event}                returns the error
   */
  static async get(universityId) {
    try {
      const data = await db.selectOne('University', '', [{ attr: 'id', oper: '=', val: universityId }]);
      return data.length !== 0 ? new University(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element in the table if it already exists, otherwise it creates it
   * @return {Promise} returns the 0 if it was saved,
   *                               1 if it failed,
   *                               2 if the country was not found
   * @throws {event}   returns the error
   */
  async save() {
    try {
      if ((await db.selectOne('Country', '', [{ attr: 'id', oper: '=', val: this.id_Country }])).length !== 0) {
        if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
        if (await db.insert('University', this)) return 0;
        return 1;
      } return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element
   * @return {Promise} returns 0 if the university is updated,
   *                           1 if it failed
   * @throws {error}   returns the error
   */
  async update() {
    try {
      if (this.id !== undefined && await db.update('University', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Deletes the element if it matches request
   * @return {Promise} returns 0 if the university is deleted,
   *                           1 if it fails,
   *                           2 if it was not found
   * @throws {event}   returns the error
   */
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('University', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the university if it exists,
   *                           an empty array if it fails
   * @throws {event} returns the error
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('University', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = University;
