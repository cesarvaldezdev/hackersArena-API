const db = require('../db');
/**
 * [Class for the Solution]
 * @param {[type]} token         [Our token]
 * @param {[type]} createdAt     [date of the token]
 * @param {[type]} expires       [when the token expires]
 * @param {[type]} type          [type of the token]
 * @param {[type]} status        [status of the token, 1=active 0= not active]
 * @param {[type]} id_User       [id of the user of the token]
 */
class Token {
  constructor(token, createdAt, expires, type, status, alias_User) {
    this.token = token;
    this.createdAt = createdAt;
    this.expires = expires;
    this.type = type;
    this.status = status;
    this.alias_User = alias_User;
  }

  //Regresa un token
  static async get(token) {
    try{
      const data = await.db.selectOne('Token','',[{attr:'id',oper:'=',val:thi.token}]);
      return data.length !== 0 ? new Token(data[0]) : data;
      if(this.expires < date) //ya expiro la sesion
      return this;
    }catch(e){
      throw e;
    }
  }
//Guardar un token
  async save(){
    try{
      if( await db.selectOne('User','',[{attr:'alias',oper:'=',val: `'${this.alias_User}'` }])).length !== 0){
        if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
        if (await db.insert('Token',this)) return 0;
        return 1; //Mo se pudo guardar
      } else return 2; //No existe el usuario
    }catch(e){
      throw e;
    }
  }

  async exists(){
    try(this.token !== undefined){
      const result = await db.selectOne('Token','',[{attr:'id',oper:'=',val:thi.token}]);
      const result 
    }
  }


}
