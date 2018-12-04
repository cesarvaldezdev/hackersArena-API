// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */


const router = require('express').Router();
const { CategoryCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all categories
router.get('/', CategoryCtrl.getAll);

// Get category by id
router.get('/:categoryId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      categoryId: 'number',
    },
  });
}, CategoryCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Categories';
}, middlewares.auth.session, middlewares.permission.check, CategoryCtrl.create);



router.put('/:categoryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      categoryId: 'number',
    },
    body: {
      name: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Categories';
}], middlewares.auth.session, middlewares.permission.check, CategoryCtrl.create);


/* POST */
router.delete('/:categoryId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      categoryId: 'number',
    },
  });
  req.body.allowQuery = 'D_Categories';
}, middlewares.auth.session, middlewares.permission.check, CategoryCtrl.delete);


module.exports = router;
