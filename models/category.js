// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2
// sería mejor usar una constante definida con un nombre mas claro

const db = require('../db');


/**
 * Class that models the category that a problem can belong to
 */
class Category {
  /**
   * Method that initializes a Category object
   * @param {[number]} id   a unique number for every instance i.e. 1
   * @param {[string]} name name of the category i.e. 'matrices', 'control statements'
   */
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }


  /**
   * Returns all existing categories in the database
   * @return {Promise} returns an array containing all existing categories
   * @throws {event}   returns the error
   */
  static async getAll() {
    try {
      const data = await db.selectAll('Category', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Category(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Returns an element if it matches the request
   * @param  {number}  categoryId the unique id that identifies the element (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns an error
   */
  static async get(categoryId) {
    try {
      const data = await db.selectOne('Category', '', [{ attr: 'id', oper: '=', val: categoryId }]);
      return data.length !== 0 ? new Category(data[0]) : data;
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
      if (await db.insert('Category', this)) return 0;
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
      if (this.id !== undefined && await db.update('Category', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
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
        if (this.id !== undefined && await db.delete('Category', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the category if it exists,
   *                           an empty array if it fails
   * @throws {event}   returns an error
   */
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('Category', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Category;
