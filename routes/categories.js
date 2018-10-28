// FIXME Corregir errores de linter
const router = require('express').Router();
const { CategoryCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', CategoryCtrl.getAll);
// FIXME falta validar el parametro
router.get('/:categoryId', CategoryCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
},CategoryCtrl.create);

// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:categoryId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          name: 'word,required',
        },
      });
    }],CategoryCtrl.create);

// FIXME falta validar el parametro
router.delete('/:categoryId', CategoryCtrl.delete);

module.exports = router;
