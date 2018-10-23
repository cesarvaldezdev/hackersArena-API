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
router.get('/:problemId', ProblemCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      id_doc: 'number,required',
      testTime: 'number,required',
      testMemory: 'number,required',
      attempts: 'number,required',
      solved: 'number,required',
      alias_User: 'alias,required',
      id_Category: 'number,required',
    },
  });
}, ProblemCtrl.create);


/* PUT */
router.put('/:problemId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      id_doc: 'number,required',
      testTime: 'number,required',
      testMemory: 'number,required',
      attempts: 'number,required',
      solved: 'number,required',
      alias_User: 'alias,required',
      id_Category: 'number,required',
    },
  });
}], ProblemCtrl.create);


/* DELETE */
router.delete('/:problemId', ProblemCtrl.delete);


module.exports = router;
