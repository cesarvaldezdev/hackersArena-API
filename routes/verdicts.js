// FIXME Corregir errores de linter
const router = require('express').Router();
const { VerdictCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', VerdictCtrl.getAll);
// FIXME falta validar el parametro
router.get('/:verdictId', VerdictCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',
    },
  });
},VerdictCtrl.create);

// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:verdictId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          type: 'word,required',
        },
      });
    }],VerdictCtrl.create);

// FIXME falta validar el parametro
router.delete('/:verdictId', VerdictCtrl.delete);

module.exports = router;
