const db = require('../db');


/**
 * [Class for the Solution]
 * @param {[type]} id         [id of the solution]
 * @param {[type]} date       [date of the solution]
 * @param {[type]} userId     [id of the user who update the solution]
 * @param {[type]} problemId  [id of the problem]
 * @param {[type]} verdictId [results after testing the solution]
 * @param {[type]} time       [time needed for the execution]
 * @param {[type]} memory     [memory needed for the solution]
 * @param {[type]} size       [size of the solution]
 * @param {[type]} languageId [language for the solution]
 */
class Solution {
  constructor(id, date, userId, problemId, verdictId, time, memory, size, languageId) {
    this.id = id;
    this.date = date;
    this.userId = userId;
    this.problemId = problemId;
    this.verdictId = verdictId;
    this.time = time;
    this.memory = memory;
    this.size = size;
    this.languageId = languageId;
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
      const data = await db.selectOne('Solution', '', [{ attr: 'id', oper: '=', val: `'${solutionId}'` }]);
      return data.length !== 0 ? new Solution(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  static async create({
    date, userId, problemId, verdictId, time, memory, size,
  }) {
    const response = await db.insert('Solution', {
      date, userId, problemId, verdictId, time, memory, size,
    });
    const id = response.insertId;
    if (id > 0) {
      return new Solution({
        date, userId, problemId, verdictId, time, memory, size,
      });
    }
    return [];
  }

  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save() {
    try {
      if ((await db.selectOne('User', '', [{ attr: 'alias', oper: '=', val: this.userId }])).length !== 0) {
        if ((await db.selectOne('Problem', '', [{ attr: 'id', oper: '=', val: this.problemId }])).length !== 0) {
          if ((await db.selectOne('Verdict', '', [{ attr: 'id', oper: '=', val: this.verdictId }])).length !== 0) {
            if ((await db.selectOne('Language', '', [{ attr: 'id', oper: '=', val: this.languageId }])).length !== 0) {
              if (this.alias !== undefined && (await this.exists()).length !== 0) {
                return this.update();
              }
              if (await db.insert('Solution', this)) return 0;
              return 1;
            } return 5;
          } return 4;
        } return 3;
      } return 2;
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento
  async update() {
    try {
      if (this.id !== undefined && await db.update('Solution', this, [{ attr: 'id', oper: '=', val: `'${this.id}'` }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Elimina el elemento en la tabla por indice
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Solution', [{ attr: 'id', oper: '=', val: `'${this.id}'` }]) !== undefined) return 0;
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
        const result = await db.selectOne('Solution', '', [{ attr: 'id', oper: '=', val: `'${this.solutionId}'` }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Solution;
