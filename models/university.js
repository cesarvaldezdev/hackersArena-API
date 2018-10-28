// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2 sería mejor usar una constante definida con un nombre mas claro

const db = require('../db');
/**
 * [Class for the University of the users]
 * @param {[type]} id      [id of the university]
 * @param {[type]} name    [name of the university]
 * @param {[type]} country [country of the university]
 * @param {[type]} logoId  [id for the university logo]
 */
class University {
  constructor({id, name, id_Country, id_logo}) {
    this.id = id;
    this.name = name;
    this.id_logo = id_logo;
    this.id_Country = id_Country;
  }
  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try{
      const data = await db.selectAll('University','','','id',true,20,0);
      const response = [];
      data.forEach((res) => {
        response.push(new University(res));
      });
      return response;
    }catch(e){
      throw e;
    }
  }
  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(universityId) {
    try{
      const data = await db.selectOne('University', '',[{attr:'id',oper:'=',val:universityId}]);
      return data.length !== 0 ? new University(data[0]) : data;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save(){
    try{
      if ( (await db.selectOne('Country','',[{attr:'id',oper:'=',val:this.id_Country}])).length !== 0){
        if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
        if (await db.insert('University', this)) return 0;
        return 1;
      }else return 2;
    }catch(e){
      throw e;
    }
  }
  // Actualiza el elemento
  async update() {
    try{
      if (this.id !== undefined && await db.update('University', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    }catch(e){
      throw e;
    }
  }
  // Elimina el elemento en la tabla por indice
  async delete() {
    try{
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('University', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
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
        const result = await db.selectOne('University','',[{attr: 'id',oper: '=',val: this.id}]);
        if(result)return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = University;
