/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { LanguageCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all languages
router.get('/', LanguageCtrl.getAll);
// FIXME falta validar el parametro
// Get a language by id
router.get('/:languageId', LanguageCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',
    },
  });
}, LanguageCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:languageId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',
    },
  });
}], LanguageCtrl.create);


/* DELETE */
// FIXME falta validar el parametro
router.delete('/:languageId', LanguageCtrl.delete);


module.exports = router;
