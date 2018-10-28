// FIXME Corregir errores de linter
const router = require('express').Router();
const { UserCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', UserCtrl.getAll);
// FIXME falta validar el parametro
router.get('/:userAlias', UserCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      name: 'word,required',
      lastName: 'word,required',
      email: 'email,required',
      password: 'password,required',
      id_University: 'number,required',
      id_Country: 'number,required',
    },
  });
},UserCtrl.create);

// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:userAlias',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          alias: 'alias,required',
          name: 'word,required',
          lastName: 'word,required',
          score: 'number',
          email: 'email,required',
          password: 'password,required',
          id_University: 'number,required',
          id_Country: 'number,required',
        },
      });
    }],UserCtrl.create);

// FIXME falta validar el parametro
router.delete('/:userAlias', UserCtrl.delete);

module.exports = router;
