const router = require('express').Router();
const { SolutionCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', SolutionCtrl.getAll);
router.get('/:solutionId', SolutionCtrl.get);

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

router.delete('/:solutionId', SolutionCtrl.delete);

module.exports = router;
