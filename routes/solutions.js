/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { SolutionCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all solutions
router.get('/', SolutionCtrl.getAll);
// FIXME falta validar el parametro
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
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
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
// FIXME falta validar el parametro
router.delete('/:solutionId', SolutionCtrl.delete);


module.exports = router;
