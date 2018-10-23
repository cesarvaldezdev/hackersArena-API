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
router.get('/:categoryId', CategoryCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
}, CategoryCtrl.create);


/* PUT */
router.put('/:categoryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
}], CategoryCtrl.create);


/* POST */
router.delete('/:categoryId', CategoryCtrl.delete);


module.exports = router;
