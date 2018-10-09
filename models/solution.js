const db = require('../db');
/**
 * [Class for the Solution]
 * @param {[type]} id         [id of the solution]
 * @param {[type]} date       [date of the solution]
 * @param {[type]} userId     [id of the user who update the solution]
 * @param {[type]} problemId  [id of the problem]
 * @param {[type]} veredictId [results after testing the solution]
 * @param {[type]} time       [time needed for the execution]
 * @param {[type]} memory     [memory needed for the solution]
 * @param {[type]} size       [size of the solution]
 * @param {[type]} languageId [language for the solution]
 */
class Solution {
  constructor(id, date, userId, problemId, veredictId, time, memory, size, languageId) {
    this.id = id;
    this.date = date;
    this.userId = userId;
    this.problemId = problemId;
    this.veredictId = veredictId;
    this.time = time;
    this.memory = memory;
    this.size = size;
    this.languageId = languageId;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Solution','','','id',true,10));
    return data;
  }

  static async get(solutionId) {
    const data = await db.selectOne('Solution', '',[{attr:'id',oper:'=',val:solutionId}]);
    return data.length !== 0 ? new Contest(data[0]) : data;
  }

  static async create({ date, userId, problemId, veredictId, time, memory, size }) {
    let response = await db.insert('Solution', { data, userId, problemId, veredictId, time, memory, size });
    const id = response.insertId;
    if (id > 0) {
      return new Solution({ data, userId, problemId, veredictId, time, memory, size });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Solution(res));
  });
  return result;
}

module.exports = Solution;
