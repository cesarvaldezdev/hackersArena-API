const db = require('../db');
/**
 * [Country : The class for the countries of each user]
 * @param {[int]} id        [id of the country]
 * @param {[string]} name   [name of the country]
<<<<<<< HEAD
 * @param {[int]} flagId    [id of the imagen of the flag]
 */
class Country {
  constructor(id, name, flagId) {
    this.id = id;
    this.name = name;
    this.flagId = flagId;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Country','','','id',true,10));
    return data;
  }

  static async get(countryId) {
    const data = await db.selectOne('Country', '',[{attr:'id',oper:'=',val:countryId}]);
    return data.length !== 0 ? new Country(data[0]) : data;
  }

  static async create({ type }) {
    let response = await db.insert('Country', { name, flagId });
    const id = response.insertId;
    if (id > 0) {
      return new Country({ id, name, flagId });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Country(res));
  });
  return result;
}
module.exports = new Country();
=======
 * @param {[int]} id_flag    [id of the imagen of the flag]
 */
class Country {
  constructor({id, name, id_flag}) {
    this.id = id;
    this.name = name;
    this.id_flag = id_flag;
  }

  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try{
      const data = await db.selectAll('Country','','','id',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new Country(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(countryId) {
    try{
      const data = await db.selectOne('Country', '',[{attr:'id',oper:'=',val:countryId}]);
      return data.length !== 0 ? new Country(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Country', this)) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento
  async update() {
    try{
      if (this.id !== undefined && await db.update('Country', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Country', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
        const result = await db.selectOne('Country','',[{attr: 'id',oper: '=',val: this.id}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Country;
>>>>>>> 1be5cc1ae1119f5216a6954df44254b7e99ec759
