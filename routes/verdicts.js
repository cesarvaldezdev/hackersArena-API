/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { VerdictCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all verdicts
router.get('/', VerdictCtrl.getAll);
// Get a verdict by id
router.get('/:verdictId', VerdictCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',
    },
  });
}, VerdictCtrl.create);


/* PUT */
router.put('/:verdictId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',
    },
  });
}], VerdictCtrl.create);

/* DELETE */
router.delete('/:verdictId', VerdictCtrl.delete);


module.exports = router;
