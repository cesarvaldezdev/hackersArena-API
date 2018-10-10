const router = require('express').Router();
const { LanguageCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', LanguageCtrl.getAll);
router.get('/:languageId', LanguageCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',
    },
  });
},LanguageCtrl.create);

router.put('/:languageId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          name: 'language,required',
        },
      });
    }],LanguageCtrl.create);

router.delete('/:languageId', LanguageCtrl.delete);

module.exports = router;
