/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { SolutionCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all solutions
router.get('/', SolutionCtrl.getAll);
// Get a solution by id
router.get('/:solutionId', SolutionCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      date: 'datetime,required',
      time: 'number,required',
      memory: 'number,required',
      size: 'number,required',
      aliasUser: 'alias,required',
      idProblem: 'number,required',
      idLanguage: 'number,required',
      idVerdict: 'number,required',
    },
  });
}, SolutionCtrl.create);


/* PUT */
router.put('/:solutionId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      date: 'datetime,required',
      time: 'number,required',
      memory: 'number,required',
      size: 'number,required',
      aliasUser: 'alias,required',
      idProblem: 'number,required',
      idLanguage: 'number,required',
      idVerdict: 'number,required',
    },
  });
}], SolutionCtrl.create);


/* DELETE */
router.delete('/:solutionId', SolutionCtrl.delete);


module.exports = router;
