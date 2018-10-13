const db = require('../db');
/**
 * [Class for the differents categories]
 * @param {[type]} id   [id of the Category]
 * @param {[type]} name [name of the Category]
 */
class Category {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
<<<<<<< HEAD

  static async getAll() {
    const data = processResult(await db.selectAll('Category','','','id',true,10));
    return data;
  }

  static async get(categoryId) {
    const data = await db.selectOne('Category', '',[{attr:'id',oper:'=',val:categoryId}]);
    return data.length !== 0 ? new Category(data[0]) : data;
  }

  static async create({ name }) {
    let response = await db.insert('Category', { name });
    const id = response.insertId;
    if (id > 0) {
      return new Category({ id, name });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Category(res));
  });
  return result;
}

module.exports = new Category();
=======
  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try{
      const data = await db.selectAll('Category','','','id',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new Category(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(categoryId) {
    try{
      const data = await db.selectOne('Category', '',[{attr:'id',oper:'=',val:categoryId}]);
      return data.length !== 0 ? new Category(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Category', this)) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento
  async update() {
    try{
      if (this.id !== undefined && await db.update('Category', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Category', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
        const result = await db.selectOne('Category','',[{attr: 'id',oper: '=',val: this.id}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }

}


module.exports = new Category();
