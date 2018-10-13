const db = require('../db');
/**
 * [Class for the Solution]
 * @param {[type]} id         [id of the solution]
 * @param {[type]} date       [date of the solution]
 * @param {[type]} userId     [id of the user who update the solution]
 * @param {[type]} problemId  [id of the problem]
 * @param {[type]} veredictId [results after testing the solution]
 * @param {[type]} time       [time needed for the execution]
 * @param {[type]} memory     [memory needed for the solution]
 * @param {[type]} size       [size of the solution]
 * @param {[type]} languageId [language for the solution]
 */
class Solution {
  constructor(id, date, userId, problemId, veredictId, time, memory, size, languageId) {
    this.id = id;
    this.date = date;
    this.userId = userId;
    this.problemId = problemId;
    this.veredictId = veredictId;
    this.time = time;
    this.memory = memory;
    this.size = size;
    this.languageId = languageId;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Solution','','','id',true,10));
    return data;
  }

  static async get(solutionId) {
    const data = await db.selectOne('Solution', '',[{attr:'id',oper:'=',val:solutionId}]);
    return data.length !== 0 ? new Contest(data[0]) : data;
  }

  static async create({ date, userId, problemId, veredictId, time, memory, size }) {
    let response = await db.insert('Solution', { data, userId, problemId, veredictId, time, memory, size });
    const id = response.insertId;
    if (id > 0) {
      return new Solution({ data, userId, problemId, veredictId, time, memory, size });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Solution(res));
  });
  return result;
}

module.export = new Solution();
=======
  constructor({id, date, time, memory, size, alias_User, id_Problem, id_Language, id_Verdict}) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.memory = memory;
    this.size = size;
    this.alias_User = alias_User;
    this.id_Problem = id_Problem;
    this.id_Language = id_Language;
    this.id_Verdict = id_Verdict;
  }
  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try{
      const data = await db.selectAll('Solution','','','id',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new Solution(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(solutionId) {
    try{
      const data = await db.selectOne('Solution', '',[{attr:'id',oper:'=',val:solutionId}]);
      return data.length !== 0 ? new Solution(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if ( (await db.selectOne('Verdict','',[{attr:'id',oper:'=',val:this.id_Verdict}])).length !== 0){
        if ( (await db.selectOne('User','',[{attr:'alias',oper:'=',val: `'${this.alias_User}'` }])).length !== 0){
          if ( (await db.selectOne('Problem','',[{attr:'id',oper:'=',val:this.id_Problem}])).length !== 0){
            if ( (await db.selectOne('Language','',[{attr:'id',oper:'=',val:this.id_Language}])).length !==0 ){
              if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
              if (await db.insert('Solution', this)) return 0;
              return 1; //No se pudo guardar
            }else return 3; //No existe el lenguaje
          }else return 2; //No existe el problema
        }else return 4;//No existe el usuario
      }else return 5;//No existe el veredicto
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento
  async update() {
    try{
      if (this.id !== undefined && await db.update('Solution', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Solution', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    }catch(e){
      throw e;
    }
  }
  // Verifica que el elemento exista
  async exists() {
    try {
      if (this.alias !== undefined) {
        const result = await db.selectOne('Solution','',[{attr: 'id',oper: '=',val: this.id}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new Solution();
