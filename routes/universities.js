/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UniversityCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all universities
router.get('/', UniversityCtrl.getAll);

// Get a university by id
router.get('/:universityId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      universityId: 'number',
    },
  });
}, UniversityCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Universities';
}, middlewares.auth.session, middlewares.permission.check, UniversityCtrl.create);


/* PUT */
router.put('/:universityId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      universityId: 'number',
    },
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Universities';
}], middlewares.auth.session, middlewares.permission.check, UniversityCtrl.create);


/* DELETE */
router.delete('/:universityId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      universityId: 'number',
    },
  });
  req.body.allowQuery = 'D_Universities';
}, middlewares.auth.session, middlewares.permission.check, UniversityCtrl.delete);


module.exports = router;
