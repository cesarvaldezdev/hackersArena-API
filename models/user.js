// FIXME Corregir errores de linter
// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2 sería mejor usar una constante definida con un nombre mas claro

const db = require('../db');
class User {
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

module.exports = User;
