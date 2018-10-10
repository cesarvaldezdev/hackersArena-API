const db = require('../db');
/**
 * [Class for the differents veredicts for any problem]
 * @param {[type]} id   [id of the veredict]
 * @param {[type]} type [type of the veredict]
 */
class Verdict {
  constructor({ id, type },) {
    this.id = id;
    this.type = type;
  }
<<<<<<< HEAD
  
  //Regresa todos los elementos que cumplen con las restricciones establecidas
=======
  // Regresa todos los elementos que cumplen con las restricciones establecidas
>>>>>>> 1be5cc1ae1119f5216a6954df44254b7e99ec759
  static async getAll() {
    try{
      const data = await db.selectAll('Verdict','','','id',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new Verdict(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
<<<<<<< HEAD

  //Regresa un solo elemento que cumple con las restricciones establecidas
=======
  // Regresa un solo elemento que cumple con las restricciones establecidas
>>>>>>> 1be5cc1ae1119f5216a6954df44254b7e99ec759
  static async get(verdictId) {
    try{
      const data = await db.selectOne('Verdict', '',[{attr:'id',oper:'=',val:verdictId}]);
      return data.length !== 0 ? new Verdict(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
<<<<<<< HEAD

  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  static async save(){
    if (this.id !== undefined && this.processResult(await db.get('Verdict', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) return this.update();
    if (await db.create('Verdicts', this)) return 0;
    return 1;
  }
  
  // Actualiza el elemento
  static async update() {
    if (this.id !== undefined && await db.update('Verdict', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
    return 1;
  }
  
  // Elimina el elemento en la tabla por indice
  static async delete() {
    if (this.id !== undefined && processResult(await db.get('Verdict', 'id', [{ attr: 'id', oper: '=', val: this.id }])).length !== 0) {
      if (this.id !== undefined && await db.delete('Verdict', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
      return 1;
    }
    return 2;
=======
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Verdict', this)) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento
  async update() {
    try{
      if (this.id !== undefined && await db.update('Verdict', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Verdict', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
        const result = await db.selectOne('Verdict','',[{attr: 'id',oper: '=',val: this.id}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
>>>>>>> 1be5cc1ae1119f5216a6954df44254b7e99ec759
  }

}

module.exports = new Verdict();
