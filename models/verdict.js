const db = require('../db');
/**
 * [Class for the differents veredicts for any problem]
 * @param {[type]} id   [id of the veredict]
 * @param {[type]} type [type of the veredict]
 */
class Verdict {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
  }
  
  //Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    const data = processResult(await db.selectAll('Verdict','','','id',true,10));
    return data;
  }

  //Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(verdictId) {
    const data = await db.selectOne('Verdict', '',[{attr:'id',oper:'=',val:verdictId}]);
    return data.length !== 0 ? new Verdict(data[0]) : data;
  }

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
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Verdict(res));
  });
  return result;
}

module.exports = new Verdict();
