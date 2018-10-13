const db = require('../db');


class User {
  constructor({
    alias, name, lastName, score, email, password, idUniversity, idCountry,
  }) {
    this.alias = alias;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.score = score;
    this.password = password;
    this.idUniversity = idUniversity;
    this.idCountry = idCountry;
  }

  // Returns all elements that comply with restrictions
  static async getAll() {
    try {
      const data = await db.selectAll('User', '', '', 'alias', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new User(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  // Returns a single element that complies with the established restrictions
  static async get(userAlias) {
    try {
      const data = await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${userAlias}'` }]);
      return data.length !== 0 ? new User(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element in the table if it already exists, otherwise it creates it
  async save() {
    try {
      if ((await db.selectOne('Country', '', [{ attr: 'id', oper: '=', val: this.idCountry }])).length !== 0) {
        if ((await db.selectOne('University', '', [{ attr: 'id', oper: '=', val: this.idUniversity }])).length !== 0) {
          if (this.alias !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('User', this)) return 0;
          return 1;
        } return 3;
      } return 2;
    } catch (e) {
      throw e;
    }
  }

  // Updates the element
  async update() {
    try {
      if (this.alias !== undefined && await db.update('User', this, [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Deletes the element in the table by id
  async delete() {
    try {
      if (this.alias !== undefined && (await this.exists()).length !== 0) {
        if (this.alias !== undefined && await db.delete('User', [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }]) !== undefined) return 0;
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
      if (this.alias !== undefined) {
        const result = await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new User();
