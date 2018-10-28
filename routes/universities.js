// FIXME Corregir errores de linter
const router = require('express').Router();
const { UniversityCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', UniversityCtrl.getAll);
// FIXME falta validar el parametro
router.get('/:universityId', UniversityCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      id_logo: 'number,required',
      id_Country: 'number,required',
    },
  });
},UniversityCtrl.create);

// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:universityId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          name: 'word,required',
          id_logo: 'number,required',
          id_Country: 'number,required',
        },
      });
    }],UniversityCtrl.create);

// FIXME falta validar el parametro
router.delete('/:universityId', UniversityCtrl.delete);

module.exports = router;
