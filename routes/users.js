/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UserCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all users
router.get('/', UserCtrl.getAll);
// Get a user by alias
router.get('/:userAlias', UserCtrl.get);

<<<<<<< HEAD
=======

/* POST */
>>>>>>> fdd3d294db3e52ccdb109f17fce9ed4e30aebd9a
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
<<<<<<< HEAD

router.put('/:userAlias', [(req, res, next) => {
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
}], UserCtrl.create);
=======
>>>>>>> fdd3d294db3e52ccdb109f17fce9ed4e30aebd9a


/* PUT */
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


/* DELETE*/
router.delete('/:userAlias', UserCtrl.delete);


module.exports = router;
