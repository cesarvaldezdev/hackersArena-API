const db = require('../db');


/**
 * [Class for the Solution]
 * @param {[type]} id         [id of the solution]
 * @param {[type]} date       [date of the solution]
 * @param {[type]} userId     [id of the user who update the solution]
 * @param {[type]} idProblem  [id of the problem]
 * @param {[type]} idVerdict [results after testing the solution]
 * @param {[type]} time       [time needed for the execution]
 * @param {[type]} memory     [memory needed for the solution]
 * @param {[type]} size       [size of the solution]
 * @param {[type]} idLanguage [language for the solution]
 */
class Solution {
  constructor({
    id, date, time, memory, size, aliasUser, idProblem, idLanguage, idVerdict,
  }) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.memory = memory;
    this.size = size;
    this.aliasUser = aliasUser;
    this.idProblem = idProblem;
    this.idLanguage = idLanguage;
    this.idVerdict = idVerdict;
  }

  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try {
      const data = await db.selectAll('Solution', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Solution(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(solutionId) {
    try {
      const data = await db.selectOne('Solution', '', [{ attr: 'id', oper: '=', val: solutionId }]);
      return data.length !== 0 ? new Solution(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save() {
    try {
      if ((await db.selectOne('Verdict', '', [{ attr: 'id', oper: '=', val: this.id_Verdict }])).length !== 0) {
        if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: `'${this.alias_User}'` }])).length !== 0) {
          if ((await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: this.id_Problem }])).length !== 0) {
            if ((await db.selectOne('Language', '', [{ attr: 'id', oper: '=', val: this.id_Language }])).length !== 0) {
              if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
              if (await db.insert('Solution', this)) return 0;
              return 1; // Can't be saved
            } return 3; // Language does not exist
          } return 2; // Problem does not exist
        } return 4; // User does not exist
      } return 5; // No existe el veredicto
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento
  async update() {
    try {
      if (this.id !== undefined && await db.update('Solution', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Elimina el elemento en la tabla por indice
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Solution', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
      if (this.alias !== undefined) {
        const result = await db.selectOne('Solution', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}
module.exports = Solution;
