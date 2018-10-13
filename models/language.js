const db = require('../db');


/**
 * [Class for the different languages for the coding problems]
 * @param {[type]} id   [id of the language]
 * @param {[type]} name [name of the language]
 */
class Language {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try {
      const data = await db.selectAll('Language', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Language(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  // Returns a single element that complies with established restrictions
  static async get(languageId) {
    try {
      const data = await db.selectOne('Language', '', [{ attr: 'id', oper: '=', val: languageId }]);
      return data.length !== 0 ? new Language(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element in the table if it already exists, if not it creates it
  async save() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Language', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element
  async update() {
    try {
      if (this.id !== undefined && await db.update('Language', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Deletes the element in the table by index
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Language', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
        const result = await db.selectOne('Language', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Language;
