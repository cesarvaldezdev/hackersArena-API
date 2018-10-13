const router = require('express').Router();
const { CategoryCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', CategoryCtrl.getAll);
router.get('/:categoryId', CategoryCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
}, CategoryCtrl.create);

router.put('/:categoryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
    },
  });
}], CategoryCtrl.create);

router.delete('/:categoryId', CategoryCtrl.delete);

module.exports = router;
