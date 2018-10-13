const db = require('../db');


/**
 * [Class for the differents veredicts for any problem]
 * @param {[type]} id   [id of the veredict]
 * @param {[type]} type [type of the veredict]
 */
class Verdict {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
  }

  // Returns all the elements that comply with the established restrictions
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

  // Returns a single element that complies with the established restrictions
  static async get(verdictId) {
    try {
      const data = await db.selectOne('Verdict', '', [{ attr: 'id', oper: '=', val: verdictId }]);
      return data.length !== 0 ? new Verdict(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element in the table if it already exists, otherwise it creates it
  async save() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Verdict', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element
  async update() {
    try {
      if (this.id !== undefined && await db.update('Verdict', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Deletes the element in the table by index
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

  // Verifies that the element exists
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

module.exports = new Verdict();
