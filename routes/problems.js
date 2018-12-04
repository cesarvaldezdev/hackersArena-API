/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { ProblemCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all problems
router.get('/', ProblemCtrl.getAll);

// Get a problem by id
router.get('/:problemId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      problemId: 'number',
    },
  });
}, ProblemCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      timeLimit: 'number,required',
      memoryLimit: 'number,required',
      attempts: 'number,required',
      solved: 'number,required',
      aliasUser: 'alias,required',
      idCategory: 'number,required',
      status: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Problems';
}, middlewares.auth.session, middlewares.permission.check, ProblemCtrl.create);


/* PUT */
router.put('/:problemId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      problemId: 'number',
    },
    body: {
      timeLimit: 'number,required',
      memoryLimit: 'number,required',
      attempts: 'number,required',
      solved: 'number,required',
      aliasUser: 'alias,required',
      idCategory: 'number,required',
      status: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Problems';
}], middlewares.auth.session, middlewares.permission.check, ProblemCtrl.create);


/* DELETE */
router.delete('/:problemId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      problemId: 'number',
    },
  });
  req.body.allowQuery = 'D_Problems';
}, middlewares.auth.session, middlewares.permission.check, ProblemCtrl.delete);


module.exports = router;
