const db = require('../db');

class Verdict {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
  }

  static async getAll() {
    const data = await db.selectAll('Verdict');
    const response = [];
    data.forEach((row) => {
      response.push(new Verdict(row));
    });
    return response;
  }

  static async get(verdictId) {
    const data = await db.selectOne('Verdict', verdictId);
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

module.exports = Verdict;
