/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { CountryCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all categories
router.get('/', CountryCtrl.getAll);

// FIXME falta validar el parametro
// Get category by id
router.get('/:countryId', CountryCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idFlag: 'number,required',

      token: 'token,required',
      //allowQuery: 11,
    },
  });
  req.body.allowQuery = 'C_Countries';//11;
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, CountryCtrl.create);


// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:countryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idFlag: 'number,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Countries';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, CountryCtrl.create);


// FIXME falta validar el parametro

/* POST */
router.delete('/:countryId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Countries';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, CountryCtrl.delete);


module.exports = router;
