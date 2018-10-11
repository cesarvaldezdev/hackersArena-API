const db = require('../db');


/**
 * Contest class, the class describes a contest.
 * @param {[int]} id         [id of a contest]
 * @param {[string]} name    [name of a contest]
 * @param {[date]} start     [date when a contest starts]
 * @param {[date]} end       [date when a contest ends]
 * @param {[string]} type    [type of contest]
 * @param {[arr]} penalty    [pentaltys of a contest]
 * @param {[int]} frozenTime [frozen time of a contest]
 * @param {[int]} deadTime   [dead time of a contest]
 * @param {[arr]} medal      [medalls of the contest]
 */
class Contest {
  constructor({
    id, name, start, end, type, penalty, frozenTime, deadTime, medal,
  }) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.type = type;
    this.penalty = penalty;
    this.frozenTime = frozenTime;
    this.deadTime = deadTime;
    this.medal = medal;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Contest', '', '', 'id', true, 10, 0));
    return data;
  }

  static async get(contestId) {
    const data = await db.selectOne('Contest', '', [{ attr: 'id', oper: '=', val: contestId }]);
    return data.length !== 0 ? new Contest(data[0]) : data;
  }

  static async create({ type }) {
    let response = await db.insert('Contest', { name, start, end });
    const id = response.insertId;
    if (id > 0) {
      return new Contest({
        id, name, start, end,
      });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Contest(res));
  });
  return result;
}

module.exports = Contest;
