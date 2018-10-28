/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { ContestCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all contests
router.get('/', ContestCtrl.getAll);
// FIXME falta validar el parametro
// Get a contest by id
router.get('/:contestId', ContestCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'name,required',
      start: 'word,required',
      end: 'word,required',
      type: 'word,required',
      penalty: 'number,required',
      frozenTime: 'number,required',
      deadTime: 'number,required',
      medal: 'number,required',
    },
  });
}, ContestCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:contestId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'name,required',
      start: 'word,required',
      end: 'word,required',
      type: 'word,required',
      penalty: 'number,required',
      frozenTime: 'number,required',
      deadTime: 'number,required',
      medal: 'number,required',
    },
  });
}], ContestCtrl.create);


/* DELETE */
// FIXME falta validar el parametro
router.delete('/:contestId', ContestCtrl.delete);


module.exports = router;
