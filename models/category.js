const db = require('../db');
/**
 * [Class for the differents categories]
 * @param {[type]} id   [id of the Category]
 * @param {[type]} name [name of the Category]
 */
class Category {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Category','','','id',true,10));
    return data;
  }

  static async get(categoryId) {
    const data = await db.selectOne('Category', '',[{attr:'id',oper:'=',val:categoryId}]);
    return data.length !== 0 ? new Category(data[0]) : data;
  }

  static async create({ name }) {
    let response = await db.insert('Category', { name });
    const id = response.insertId;
    if (id > 0) {
      return new Category({ id, name });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Category(res));
  });
  return result;
}

module.exports = new Category();
