
const db = require('../db');

class Allow {

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    try {
      const data = await db.selectAll('Allow', '', '', 'id', true, 100, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Allow(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async get(allowId) {
    try {
      const data = await db.selectOne('Allow', '', [{ attr: 'id', oper: '=', val: allowId }]);
      return data.length !== 0 ? new Allow(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  static async findId(allowName) {
    try{
      const data = await db.selectOne('Allow', '', [{ attr: 'name', oper: '=', val: `'${allowName}'` }]);
      return data;
    }catch(e){
      throw(e);
    }
  }

  async save() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Allow', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  async update() {
    try {
      if (this.id !== undefined && await db.update('Allow', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Allow', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
        const result = await db.selectOne('Allow', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Allow;
