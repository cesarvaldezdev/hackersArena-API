const router = require('express').Router();
const { verdictsCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', verdictsCtrl.getAll);
router.get('/:verdictId', verdictsCtrl.get);
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'type,required',
      unwanted: 'required',
    },
  });
}, verdictsCtrl.create);
router.delete('/:verdictId', verdictsCtrl.delete);

module.exports = router;
