const db = require('../db');

class Verdict {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Verdict','','','id',true,10));
    return data;
  }

  static async get(verdictId) {
    const data = await db.selectOne('Verdict', '',[{attr:'id',oper:'=',val:verdictId}]);
    return data.length !== 0 ? new Verdict(data[0]) : data;
  }

  static async create({ type }) {
    let response = await db.insert('Verdict', { type });
    const id = response.insertId;
    if (id > 0) {
      return new Verdict({ id, type });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Verdict(res));
  });
  return result;
}

module.exports = Verdict;
