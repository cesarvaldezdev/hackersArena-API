/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { CountryCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* POST */
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
    },
  });
}, CountryCtrl.create);


// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:countryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      id_flag: 'number,required',
    },
  });
}], CountryCtrl.create);


// FIXME falta validar el parametro
router.delete('/:countryId', CountryCtrl.delete);


module.exports = router;
