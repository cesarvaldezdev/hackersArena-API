const db = require('../db');


/**
 * [Class for the University of the users]
 * @param {[type]} id      [id of the university]
 * @param {[type]} name    [name of the university]
 * @param {[type]} idCountry [country of the university]
 * @param {[type]} idlogo  [id for the university logo]
 */
class University {
  constructor({
    id, name, idCountry, idLogo,
  }) {
    this.id = id;
    this.name = name;
    this.idLogo = idLogo;
    this.idCountry = idCountry;
  }

  // Returns every element that complies with the established restrictions
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

  // Returns a single element that complies with the established restrictions
  static async get(universityId) {
    try {
      const data = await db.selectOne('University', '', [{ attr: 'id', oper: '=', val: universityId }]);
      return data.length !== 0 ? new University(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element in the table if it already exists, otherwise it creates it
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

  // Updates the element
  async update() {
    try {
      if (this.id !== undefined && await db.update('University', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Deletes the element in the table by index
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

  // Verifies that the element exists
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
