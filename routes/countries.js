/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { CountryCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* POST */
router.get('/', CountryCtrl.getAll);
router.get('/:countryId', CountryCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      id_flag: 'number,required',
    },
  });
}, CountryCtrl.create);

router.put('/:countryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      id_flag: 'number,required',
    },
  });
}], CountryCtrl.create);

router.delete('/:countryId', CountryCtrl.delete);

module.exports = router;
