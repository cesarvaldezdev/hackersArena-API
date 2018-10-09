const db = require('../db');
/**
 * [Class for every coding problem]
 * @param {[type]} id          [id of the problem]
 * @param {[type]} title       [title of the problem]
 * @param {[type]} difficulty  [difficulty of the problem]
 * @param {[type]} author      [author of the problem]
 * @param {[type]} score       [score for the problem]
 * @param {[type]} testTime    [test time of the problem]
 * @param {[type]} memory      [memory needed for the problem]
 * @param {[type]} description [aditional description of the problem]
 * @param {[type]} input       [expected input]
 * @param {[type]} output      [expected output]
 */
class Problem {
  constructor(id, title, difficulty, author, score, testTime, memory, description, input, output) {
    this.id = id;
    this.title = title;
    this.difficulty = author;
    this.score = score;
    this.testTime = testTime;
    this.memory = memory;
    this.description = description;
    this.input = input;
    this.output = output;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Problem','','','id',true,10));
    return data;
  }

  static async get(problemId) {
    const data = await db.selectOne('Problem', '',[{attr:'id',oper:'=',val:problemId}]);
    return data.length !== 0 ? new Problem(data[0]) : data;
  }

  static async create({ title, difficulty, author }) {
    let response = await db.insert('Problem', { title, difficulty, author });
    const id = response.insertId;
    if (id > 0) {
      return new Problem({ id, title, difficulty, author });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Problem(res));
  });
  return result;
}

module.exports = Problem;
