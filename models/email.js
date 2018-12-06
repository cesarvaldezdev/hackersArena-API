
const db = require('../db');


/**
 * Class that models the verdict of a problem processed by the judge
 * It is stored in the DB as a catalog
 */
class Email {
  /**
   * A method that initializes a Verdict object
   * @param {number} id   the unique number that identifies the verdict (system created)
   * @param {string} type the type of the verdict i.e. 'Failed to compile'
   */
  constructor({ aliasUser, email, status }) {
    this.aliasUser = aliasUser;
    this.email = email;
    this.status = status;
  }


  /**
   * Returns all existing verdicts in the database
   * @return {Promise} returns an array containing all existing verdicts
   * @throws {event}   returns the error
   */
   static async getByEmail(email) {
     try {
       const data = await db.selectOne('Email', '', [{ attr: 'email', oper: '=', val: `'${email}'` }]);
       return data.length !== 0 ? new Email(data[0]) : data;
     } catch (e) {
       throw e;
     }
   }

  /**
   * Returns an element if it matches the request
   * @param  {number}  verdictId the unique id that identifies the element (param in the url)
   * @return {Promise}           returns the requested object
   * @throws {event}             returns an error
   */
  static async get(aliasUser) {
    try {
      const data = await db.selectAll('Email', '', [{ attr: 'aliasUser', oper: '=', val: `'${aliasUser}'` }], 'aliasUser', true, 200, 0);
      //const data = await db.selectAll('Email', '', );
      const response = [];
      data.forEach((res) => {
        if(res.status === 1){
          res.aliasUser = undefined;
          res.status = undefined;
          response.push(new Email(res));
        }
      });
      return response;
      //return data.length !== 0 ? new Verdict(data[0]) : data;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Updates the element that matches request, if none match, it creates it
   * @return {Promise} returns 0 if it exists
   *                           1 if it failed
   * @throws {event}   returns an error
   */
   async save() {
     try {
       if (this.aliasUser !== undefined && this.email !== undefined && (await this.exists()).length !== 0) return this.update();
       if (await db.insert('Email', this)) return 0;
       return 1;
     } catch (e) {
       throw e;
     }
   }

    /**
     * Updates an element if it matches request
     * @return {Promise} returns 0 if the element was updated,
     *                           1 if it failed
     * @throws {event}   returns an error
     */
    async update() {
      try {
        if (this.aliasUser !== undefined && this.email !== undefined && await db.update('Email', this, [
          { attr: 'aliasUser', oper: '=', val: `'${this.aliasUser}'` },
          { logic: 'and',attr: 'email', oper: '=', val: `'${this.email}'`},
        ])) return 0;
        return 1;
      } catch (e) {
        throw e;
      }
    }


  /**
   * Deletes an element if it matches the request
   * @return {Promise} returns a 0 if the verdict is deleted,
   *                             1 if the verdict could not be deleted,
   *                             2 if it can't be found
   * @throws {event}   returns an error
   */
  async delete() {
    try {
      if (this.aliasUser !== undefined && (await this.exists()).length !== 0) {
        if (this.id !== undefined && await db.delete('Email', [
          { attr: 'aliasUser', oper: '=', val: `'${this.aliasUser}'` },
          { logic: 'and',attr: 'email', oper: '=', val: `'${this.email}'`},
        ]) !== undefined) return 0;
        return 1;
      }
      return 2;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Verifies that the element exists
   * @return {Promise} returns the verdict if it exists,
   *                           an empty array if it fails
   * @throws {event}   returns an error
   */
  async exists() {
    try {
      if (this.aliasUser !== undefined && this.email !== undefined) {
        const result = await db.selectOne('Email', '', [
          { attr: 'aliasUser', oper: '=', val: `'${this.aliasUser}'` },
          { logic: 'and',attr: 'email', oper: '=', val: `'${this.email}'`},
        ]);
        if (result) return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }
}


module.exports = Email;
