/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { RoleCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all verdicts
router.get('/',(req, res, next) => {
  req.body.allowQuery = 'GA_Roles';
}, middlewares.auth.session, middlewares.permission.check, RoleCtrl.getAll);


// Get a verdict by id
router.get('/:roleId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      roleId: 'number',
    },
  });
  req.body.allowQuery = 'G_Roles';
}, middlewares.auth.session, middlewares.permission.check, RoleCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Roles';
}, middlewares.auth.session, middlewares.permission.check, RoleCtrl.create);


/* PUT */

router.put('/:roleId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      roleId: 'number',
    },
    body: {
      name: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Roles';
}],  middlewares.auth.session, middlewares.permission.check, RoleCtrl.create);

/* DELETE */
router.delete('/:roleId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      roleId: 'number',
    },
  });
  req.body.allowQuery = 'D_Roles';
}, middlewares.auth.session, middlewares.permission.check, RoleCtrl.delete);


module.exports = router;
