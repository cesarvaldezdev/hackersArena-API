
const db = require('../db');

class Role {

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    try {
      const data = await db.selectAll('Role', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Role(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async get(roleId) {
    try {
      const data = await db.selectOne('Role', '', [{ attr: 'id', oper: '=', val: roleId }]);
      return data.length !== 0 ? new Role(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  async save() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Role', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  async update() {
    try {
      if (this.id !== undefined && await db.update('Role', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Role', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('Role', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Role;
