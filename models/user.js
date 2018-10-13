const db = require('../db');
class User {
  constructor(id, name, lastName, email, alias, country, score, password, university) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.alias = alias;
    this.country = country;
    this.score = score;
    this.password = password;
    this.university = university;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Contest','','','id',true,10));
    return data;
  }

  static async get(userId) {
    const data = await db.selectOne('User', '',[{attr:'id',oper:'=',val:userId}]);
    return data.length !== 0 ? new User(data[0]) : data;
  }

  static async create({ name, lastName, email, alias, country, score, password, university }) {
    let response = await db.insert('User', { name, lastName, email, alias, country, score, password, university });
    const id = response.insertId;
    if (id > 0) {
      return new User({ id, name, lastName, email, alias, country, score, password, university });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new User(res));
  });
  return result;
}

module.export = new User();
=======
  constructor({alias, name, lastName, score, email, password, id_University, id_Country}) {
    this.alias = alias;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.score = score;
    this.password = password;
    this.id_University = id_University;
    this.id_Country = id_Country;
  }

  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try{
      const data = await db.selectAll('User','','','alias',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new User(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(userAlias) {
    try{
      const data = await db.selectOne('User', '',[{attr:'alias',oper:'=',val:`'${userAlias}'`}]);
      return data.length !== 0 ? new User(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if ( (await db.selectOne('Country','',[{attr:'id',oper:'=',val:this.id_Country}])).length !== 0){
        if ( (await db.selectOne('University','',[{attr:'id',oper:'=',val:this.id_University}])).length !==0 ){
          if (this.alias !== undefined && (await this.exists()).length !== 0) return this.update();
          if (await db.insert('User', this)) return 0;
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
      if (this.alias !== undefined && await db.update('User', this, [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.alias !== undefined && (await this.exists()).length !== 0) {
        if (this.alias !== undefined && await db.delete('User', [{ attr: 'alias', oper: '=', val: `'${this.alias}'` }]) !== undefined) return 0;
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
        const result = await db.selectOne('User','',[{attr: 'alias',oper: '=',val: `'${this.alias}'`}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new User();
