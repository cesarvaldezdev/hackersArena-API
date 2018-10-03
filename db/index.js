const process = require('process');
const crypto = require('crypto');
const Knex = require('knex');


class DB{
  constructor(){
    this.knex=connect();
  }
  selectAll(table,columns,filters,order,asc,limit){
    let filts='';
    let ord='asc';
    if (filters!='') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    if(columns=='') columns='*';
    if(!asc) ord='desc';
    return this.knex
      .select(columns)
      .from(table)
      .whereRaw(filts)
      .orderBy(order,ord)
      .limit(limit)
      .then((results) => {
        return results;
      }).catch(function(e) { console.error(e); });
  }

  selectOne(table,columns,filters){
    let filts='';
    if (filters!='') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    if(columns=='') columns='*';
    return this.knex
      .select(columns)
      .from(table)
      .whereRaw(filts)
      .limit(1)
      .then((results) => {
        return results;
      }).catch(function(e) { console.error(e); });
  }

  insert(table,post){
    return this.knex(table)
      .insert(post)
      .then((results)=>{
        return results;
      }).catch(function(e) { console.error(e); });
  }

  update(table,post,filters){
    let filts='';
    if (filters!='') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    return this.kenx(table)
      .whereRaw(filts)
      .update(post)
      .then((results)=>{
        return results;
      }).catch(function(e) { console.error(e); });
  }

  delete(table,filters){
    let filts='';
    if (filters!='') {
      filters.forEach((i, index) => {
        if (index !== 0) filts += `${i.logic} `;
        filts += `${i.attr.replace('`', '').replace('`', '')} ${i.oper} `;
        if (i.oper === 'LIKE') filts += `'%${i.val.replace('\'', '').replace('\'', '')}%' `;
        else filts += `${i.val} `;
      });
    }
    return this.knex(table)
      .whereRaw(filters)
      .del()
      .then((results)=>{
        return results;
      }).catch(function(e) { console.error(e); });
  }

}

function connect () {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };
  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  const knex = Knex({
    client: 'mysql',
    connection: config
  });
  return knex;
}

module.exports = new DB();
