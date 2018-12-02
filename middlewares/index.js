const validator = require('./validator');
const errorHandler = require('./errorHandler');
const auth = require('./auth');
const permission = require('./permission');

module.exports = {
  validator,
  errorHandler,
  auth,
  permission,
};
