const router = require('express').Router();
const { VerdictCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', VerdictCtrl.getAll);
router.get('/:verdictId', VerdictCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',
    },
  });
}, VerdictCtrl.create);

router.put('/:verdictId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',
    },
  });
}], VerdictCtrl.create);

router.delete('/:verdictId', VerdictCtrl.delete);

module.exports = router;
