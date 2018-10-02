const db = require('../db');
class User {
  constructor(id, name, lastName, email, alias, country, score, password, university) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.alias = alias;
    this.country = country;
    this.score = score;
    this.password = password;
    this.university = university;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Contest','','','','','','','','','id',true,10));
    return data;
  }

  static async get(userId) {
    const data = await db.selectOne('User', '',[{attr:'id',oper:'=',val:userId}]);
    return data.length !== 0 ? new User(data[0]) : data;
  }

  static async create({ name, lastName, email, alias, country, score, password, university }) {
    let response = await db.insert('User', { name, lastName, email, alias, country, score, password, university });
    const id = response.insertId;
    if (id > 0) {
      return new User({ id, name, lastName, email, alias, country, score, password, university });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new User(res));
  });
  return result;
}

module.export = new User();
