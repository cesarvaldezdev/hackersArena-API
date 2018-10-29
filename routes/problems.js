/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { ProblemCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all problems
router.get('/', ProblemCtrl.getAll);
// FIXME falta validar el parametro
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
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
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
// FIXME falta validar el parametro
router.delete('/:problemId', ProblemCtrl.delete);


module.exports = router;
