const db = require('../db');
/**
 * [Class for the University of the users]
 * @param {[type]} id      [id of the university]
 * @param {[type]} name    [name of the university]
 * @param {[type]} country [country of the university]
 * @param {[type]} logoId  [id for the university logo]
 */
class University {
  constructor(id, name, country, logoId) {
    this.id = id;
    this.name = name;
    this.logoId = logoId;
    this.country = country;
  }
  static async getAll() {
    const data = processResult(await db.selectAll('University','','','id',true,10));
    return data;
  }

  static async get(universityId) {
    const data = await db.selectOne('University', '',[{attr:'id',oper:'=',val:universityId}]);
    return data.length !== 0 ? new University(data[0]) : data;
  }

  static async create({ name, country, logoId }) {
    let response = await db.insert('University', { name, country, logoId });
    const id = response.insertId;
    if (id > 0) {
      return new Verdict({ id, name, country, logoId });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new University(res));
  });
  return result;
}

module.exports = new University();
