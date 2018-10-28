// FIXME Corregir errores de linter
const router = require('express').Router();
const { ContestCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', ContestCtrl.getAll);
// FIXME falta validar el parametro
router.get('/:contestId', ContestCtrl.get);

router.post('/',(req, res, next) => {
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
},ContestCtrl.create);

// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:contestId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          name: 'name,required',
          start: 'word,required',
          end: 'word,required',
          type: 'word,required',
          penalty: 'number,require
          d',
          frozenTime: 'number,required',
          deadTime: 'number,required',
          medal: 'number,required',
        },
      });
    }],ContestCtrl.create);

// FIXME falta validar el parametro
router.delete('/:contestId', ContestCtrl.delete);

module.exports = router;
