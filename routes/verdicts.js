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
router.get('/:verdictId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      verdictId: 'number',
    },
  });
}, VerdictCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Verdicts';
}, middlewares.auth.session, middlewares.permission.check, VerdictCtrl.create);


/* PUT */
router.put('/:verdictId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      verdictId: 'number',
    },
    body: {
      type: 'word,required',
    },
  });
  req.body.allowQuery = 'C_Verdicts';
}], middlewares.auth.session, middlewares.permission.check, VerdictCtrl.create);

/* DELETE */
router.delete('/:verdictId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      verdictId: 'number',
    },
  });
  req.body.allowQuery = 'D_Verdicts';
},middlewares.auth.session, middlewares.permission.check,VerdictCtrl.delete);


module.exports = router;
