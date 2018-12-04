/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { CountryCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all categories
router.get('/', CountryCtrl.getAll);

// Get category by id
router.get('/:countryId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      countryId: 'number',
    },
  });
}, CountryCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idFlag: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Countries';
}, middlewares.auth.session, middlewares.permission.check, CountryCtrl.create);


router.put('/:countryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      countryId: 'number',
    },
    body: {
      name: 'word,required',
      idFlag: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Countries';
}], middlewares.auth.session, middlewares.permission.check, CountryCtrl.create);



/* POST */
router.delete('/:countryId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      countryId: 'number',
    },
  });
  req.body.allowQuery = 'D_Countries';
}, middlewares.auth.session, middlewares.permission.check, CountryCtrl.delete);


module.exports = router;
