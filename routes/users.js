const router = require('express').Router();
const { UserCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', UserCtrl.getAll);
router.get('/:userAlias', UserCtrl.get);

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

router.delete('/:userAlias', UserCtrl.delete);

module.exports = router;
