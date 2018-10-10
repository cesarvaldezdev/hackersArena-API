const db = require('../db');
<<<<<<< HEAD
/**
 * [Class for every coding problem]
 * @param {[type]} id          [id of the problem]
 * @param {[type]} title       [title of the problem]
 * @param {[type]} difficulty  [difficulty of the problem]
 * @param {[type]} author      [author of the problem]
 * @param {[type]} score       [score for the problem]
 * @param {[type]} testTime    [test time of the problem]
 * @param {[type]} memory      [memory needed for the problem]
 * @param {[type]} description [aditional description of the problem]
 * @param {[type]} input       [expected input]
 * @param {[type]} output      [expected output]
 */
class Problem {
  constructor(id, title, difficulty, author, score, testTime, memory, description, input, output) {
    this.id = id;
    this.title = title;
    this.difficulty = author;
    this.score = score;
    this.testTime = testTime;
    this.memory = memory;
    this.description = description;
    this.input = input;
    this.output = output;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Problem','','','id',true,10));
    return data;
  }

  static async get(problemId) {
    const data = await db.selectOne('Problem', '',[{attr:'id',oper:'=',val:problemId}]);
    return data.length !== 0 ? new Problem(data[0]) : data;
  }

  static async create({ title, difficulty, author }) {
    let response = await db.insert('Problem', { title, difficulty, author });
    const id = response.insertId;
    if (id > 0) {
      return new Problem({ id, title, difficulty, author });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Problem(res));
  });
  return result;
}

module.export = new Problem();
=======

class Problem {
  constructor({id, id_doc, testTime, testMemory, attempts, solved, alias_User, id_Category}) {
    this.id = id;
    this.id_doc = id_doc;
    this.testTime = testTime;
    this.testMemory = testMemory;
    this.attempts = attempts;
    this.solved = solved;
    this.alias_User = alias_User;
    this.id_Category = id_Category;
  }
  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try{
      const data = await db.selectAll('Problem','','','id',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new Problem(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(problemId) {
    try{
      const data = await db.selectOne('Problem', '',[{attr:'id',oper:'=',val:problemId}]);
      return data.length !== 0 ? new Problem(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if ( (await db.selectOne('User','',[{attr:'alias',oper:'=',val: `'${this.alias_User}'` }])).length !== 0){
        if ( (await db.selectOne('Category','',[{attr:'id',oper:'=',val:this.id_Category}])).length !==0 ){
          if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('Problem', this)) return 0;
          return 1;
        }else return 3;
      }else return 2;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento
  async update() {
    try{
      if (this.id !== undefined && await db.update('Problem', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Problem', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
      if (this.id !== undefined) {
        const result = await db.selectOne('Problem','',[{attr: 'id',oper: '=',val: this.id}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Problem;
>>>>>>> 1be5cc1ae1119f5216a6954df44254b7e99ec759
