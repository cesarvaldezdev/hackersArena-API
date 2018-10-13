const db = require('../db');
/**
 * [Country : The class for the countries of each user]
 * @param {[int]} id        [id of the country]
 * @param {[string]} name   [name of the country]
 * @param {[int]} idFlag    [id of the imagen of the flag]
 */
class Country {
  constructor({
    id, name, idFlag,
  }) {
    this.id = id;
    this.name = name;
    this.id_flag = idFlag;
  }

  // Regresa todos los elementos que cumplen con las restricciones establecidas
  static async getAll() {
    try {
      const data = await db.selectAll('Country', '', '', 'id', true, 20, 0);
      const response = [];
      data.forEach((res) => {
        response.push(new Country(res));
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  // Regresa un solo elemento que cumple con las restricciones establecidas
  static async get(countryId) {
    try {
      const data = await db.selectOne('Country', '', [{ attr: 'id', oper: '=', val: countryId }]);
      return data.length !== 0 ? new Country(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento en la tabla si este ya existe, sino lo crea
  async save() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) return this.update();
      if (await db.insert('Country', this)) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Actualiza el elemento
  async update() {
    try {
      if (this.id !== undefined && await db.update('Country', this, [{ attr: 'id', oper: '=', val: this.id }])) return 0;
      return 1;
    } catch (e) {
      throw e;
    }
  }

  // Elimina el elemento en la tabla por indice
  async delete() {
    try {
      if (this.id !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Country', [{ attr: 'id', oper: '=', val: this.id }]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }

  // Verifica que el elemento exista
  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.selectOne('Country', '', [{ attr: 'id', oper: '=', val: this.id }]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new Country();
