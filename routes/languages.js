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
router.get('/:languageId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      languageId: 'number',
    },
  });
}, LanguageCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',
    },
  });
  req.body.allowQuery = 'C_Languages';
}, middlewares.auth.session, middlewares.permission.check, LanguageCtrl.create);


/* PUT */
router.put('/:languageId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      languageId: 'number',
    },
    body: {
      name: 'language,required',
    },
  });
  req.body.allowQuery = 'C_Languages';
}], middlewares.auth.session, middlewares.permission.check, LanguageCtrl.create);


/* DELETE */
router.delete('/:languageId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      languageId: 'number',
    },
  });
  req.body.allowQuery = 'D_Languages';
}, middlewares.auth.session, middlewares.permission.check,LanguageCtrl.delete);


module.exports = router;
