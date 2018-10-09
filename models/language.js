const db = require('../db');
/**
 * [Class for the different languages for the coding problems]
 * @param {[type]} id   [id of the language]
 * @param {[type]} name [name of the language]
 */
class Language {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const data = processResult(await db.selectAll('Language','','','id',true,10));
    return data;
  }

  static async get(languageId) {
    const data = await db.selectOne('Language', '',[{attr:'id',oper:'=',val:languageId}]);
    return data.length !== 0 ? new Language(data[0]) : data;
  }

  static async create({ type }) {
    let response = await db.insert('Language', { name });
    const id = response.insertId;
    if (id > 0) {
      return new Language({ id, name });
    }
    return [];
  }
}

function processResult(data) {
  const result = [];
  data.forEach((res) => {
    result.push(new Language(res));
  });
  return result;
}

module.exports = Language;
