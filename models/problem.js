const db = require('../db');


/**
 * [Class for every coding problem]
 * @param {[type]} id         [id of the problem]
 * @param {[type]} idDoc      [id of the document]
 * @param {[type]} testTime   [time of the test]
 * @param {[type]} testMemory [memory used in test]
 * @param {[type]} attempts   [number of attempts]
 * @param {[type]} solved     [true if problem is solved]
 * @param {[type]} aliasUser  [alias of the user]
 * @param {[type]} idCategory [id of the category]
 */
class Problem {
  constructor({
    id, docId, testTime, testMemory, attempts, solved, aliasUser, idCategory,
  }) {
    this.id = id;
    this.idDoc = docId;
    this.testTime = testTime;
    this.testMemory = testMemory;
    this.attempts = attempts;
    this.solved = solved;
    this.aliasUser = aliasUser;
    this.idCategory = idCategory;
  }

  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try {
      const data = await db.selectAll('Problem', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Problem(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(problemId) {
    try {
      const data = await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: problemId }]);
      return data.length !== 0 ? new Problem(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save() {
    try {
      if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.alias_User}'` }])).length !== 0) {
        if ((await db.selectOne('Category', '', [{ attr: 'id', oper: '=', val: this.id_Category }])).length !== 0) {
          if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('Problem', this)) return 0;
          return 1;
        } return 3;
      } return 2;
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento
  async update() {
    try {
      if (this.id !== undefined && await db.update('Problem', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Elimina el elemento en la tabla por indice
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Problem', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }

  // Verifica que el elemento exista
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new Problem();
