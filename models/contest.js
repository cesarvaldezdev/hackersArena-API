/*
 * THIS IS A MODEL IN PROGRESS
 */
const db = require('../db');


/**
 * Class that models a contest.
 */
class Contest {
  /**
   * Method that initializes a Contest object
   * @param {number} id         the unique number that identifies the contest (system created)
   * @param {string} name       the name of a contest
   * @param {date} start        the date in which a contest starts
   * @param {date} end          the date in which a contest ends
   * @param {string} type       the type of contest
   * @param {number} penalty    the penalty of a contest
   * @param {number} frozenTime the frozen time of a contest
   * @param {number} deadTime   the dead time of a contest
   * @param {array} medal       the medals of the contest
   */
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


  /**
   * [getAll description]
   * @return {Promise} [description]
   */
  static async getAll() {
    const data = processResult(await db.selectAll('Contest', '', '', 'id', true, 10, 0));
    return data;
  }


  /**
   * [get description]
   * @param  {[type]}  contestId [description]
   * @return {Promise}           [description]
   */
  static async get(contestId) {
    const data = await db.selectOne('Contest', '', [{ attr: 'id', oper: '=', val: contestId }]);
    return data.length !== 0 ? new Contest(data[0]) : data;
  }


  /**
   * [create description]
   * @param  {[type]}  type [description]
   * @return {Promise}      [description]
   */
  static async create({ type }) {
    const response = await db.insert('Contest', { name, start, end });
    const id = response.insertId;
    if (id > 0) {
      return new Contest({
        id, name, start, end,
      });
    }
    return [];
  }
}


/**
 * [processResult description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Contest(res));
  });
  return result;
}

module.exports = Contest;
