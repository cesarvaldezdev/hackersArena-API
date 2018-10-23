/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { LanguageCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all languages
router.get('/', LanguageCtrl.getAll);
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
router.put('/:languageId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',
    },
  });
}], LanguageCtrl.create);


/* DELETE */
router.delete('/:languageId', LanguageCtrl.delete);


module.exports = router;
