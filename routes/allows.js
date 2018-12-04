/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { AllowCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all verdicts
router.get('/', (req, res, next) => {
  req.body.allowQuery = 'GA_Allows';
  next();
}, middlewares.auth.session, middlewares.permission.check, AllowCtrl.getAll);

// Get a verdict by id
router.get('/:allowId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      allowId: 'number',
    },
  });
  req.body.allowQuery = 'G_Allows';
}, middlewares.auth.session, middlewares.permission.check, AllowCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Allows';
}, middlewares.auth.session, middlewares.permission.check, AllowCtrl.create);


/* PUT */
router.put('/:allowId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      allowId: 'number',
    },
    body: {
      name: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Allows';
}], middlewares.auth.session, middlewares.permission.check, AllowCtrl.create);

/* DELETE */
router.delete('/:allowId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      allowId: 'number',
    },
  });
  req.body.allowQuery = 'D_Allows';
}, middlewares.auth.session, middlewares.permission.check, AllowCtrl.delete);


module.exports = router;
