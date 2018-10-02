const db = require('../db');
/**
 * [Country : The class for the countries of each user]
 * @param {[int]} id        [id of the country]
 * @param {[string]} name   [name of the country]
 * @param {[int]} flagId    [id of the imagen of the flag]
 */
class Country {
  constructor(id, name, flagId) {
    this.id = id;
    this.name = name;
    this.flagId = flagId;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Country','','','','id',true,10));
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
