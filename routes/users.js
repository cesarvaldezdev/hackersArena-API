// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UserCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all users
router.get('/', UserCtrl.getAll);
// FIXME falta validar el parametro
// Get a user by alias
router.get('/:userAlias', UserCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      name: 'word,required',
      lastName: 'word,required',
      email: 'email,required',
      password: 'password,required',
      idUniversity: 'number,required',
      idCountry: 'number,required',
    },
  });
}, UserCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:userAlias', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      name: 'word,required',
      lastName: 'word,required',
      score: 'number',
      email: 'email,required',
      password: 'password,required',
      idUniversity: 'number,required',
      idCountry: 'number,required',
    },
  });
}], UserCtrl.create);


/* DELETE */
// FIXME falta validar el parametro
router.delete('/:userAlias', UserCtrl.delete);


module.exports = router;
