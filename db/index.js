const process = require('process');
const crypto = require('crypto');
const Knex = require('knex');


class DB{
  constructor(){
    this.knex=connect();
  }
  selectAll(table){
    return this.knex
      .select('*')
      .from(table)
      .then((results) => {
        return results;
      }).catch(function(error) {
        console.error(error);
      });
  }

  selectOne(table,id){
    return this.knex
      .select(id)
      .from(table)
      .then((results)=>{
        return results;
      }).catch(function(error) {
        console.error(error);
      });
  }
}

function connect () {
  // [START connect]
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };

  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  });
  // [END connect]

  return knex;
}


module.exports = new DB();
