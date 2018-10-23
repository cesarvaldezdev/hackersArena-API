const process = require('process');
// const crypto = require('crypto');
const Knex = require('knex');


/**
 * Class that models the interaction with the database
 */
class DB {
  /**
   * Method that initializes the connection
   */
  constructor() {
    this.knex = connect();
  }


  /**
   * Obtains all the rows that match the query
   * @param  {string} table   the query in which the rows are sought
   * @param  {string} columns the columns needed in the query
   * @param  {string} filters the filters wanted to be applied in the query
   * @param  {string} order   the column used to sort the rows
   * @param  {boolean} asc    true if order is ascendent, false if descendent
   * @param  {number} limit   the limit the number of rows to be obtained
   * @param  {number} offset  the offset of the query
   * @return {array}         an array containing the rows that match the query
   */
  selectAll(table, columns, filters, order, asc, limit, offset) {
    let filts = '';
    let ord = 'asc';
    if (filters !== '') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    if (columns === '') columns.concat('*');
    if (!asc) ord = 'desc';
    return this.knex
      .select(columns)
      .from(table)
      .whereRaw(filts)
      .orderBy(order, ord)
      .limit(limit)
      .offset(offset)
      .then(results => results)
      .catch(e => console.error(e));
  }


  /**
   * Obtains a single row that matches the query
   * @param  {string} table   the table in which the row is sought
   * @param  {string} columns the columns needed in the query
   * @param  {string} filters the filters applied to the query
   * @return {object}         returns a row that matches the query
   */
  selectOne(table, columns, filters) {
    let filts = '';
    if (filters !== '') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    if (columns === '') columns.concat('*');
    return this.knex
      .select(columns)
      .from(table)
      .whereRaw(filts)
      .limit(1)
      .then(results => results)
      .catch(e => console.error(e));
  }


  /**
   * Inserts a row in the table
   * @param  {string} table the table in which the query acts
   * @param  {object} post  the row to be inserted
   * @return {knex}         returns
   */
  insert(table, post) {
    return this.knex(table)
      .insert(post)
      .then(results => results)
      .catch(e => console.error(e));
  }


  /**
   * Updates rows in the table
   * @param  {string} table   the table in which the query acts
   * @param  {object} post    the object to be updated
   * @param  {string} filters the filters applied to query
   * @return {knex}           returns the modified table
   */
  update(table, post, filters) {
    let filts = '';
    if (filters !== '') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    return this.knex(table)
      .whereRaw(filts)
      .update(post)
      .then(results => results)
      .catch(e => console.error(e));
  }


  /**
   * Deletes a row that matches the query
   * @param  {string} table   the table in which the query acts
   * @param  {string} filters the filters applied to the query
   * @return {knex}           returns the modified table
   */
  delete(table, filters) {
    let filts = '';
    if (filters !== '') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    return this.knex(table)
      .whereRaw(filts)
      .del()
      .then(results => results)
      .catch(e => console.error(e));
  }
}


/**
 * Makes a connection to the database
 * @return {knex} returns the connection
 */
function connect() {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  };
  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  const knex = Knex({
    client: 'mysql',
    connection: config,
  });
  return knex;
}


module.exports = new DB();
