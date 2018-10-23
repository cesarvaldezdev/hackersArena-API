/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { ContestCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all contests
router.get('/', ContestCtrl.getAll);
// Get a contest by id
router.get('/:contestId', ContestCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'name,required',
      start: 'word,required',
      end: 'word,required',
      type: 'word,required',
      penalty: 'number,required',
      frozenTime: 'number,required',
      deadTime: 'number,required',
      medal: 'number,required',
    },
  });
}, ContestCtrl.create);


/* PUT */
router.put('/:contestId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'name,required',
      start: 'word,required',
      end: 'word,required',
      type: 'word,required',
      penalty: 'number,required',
      frozenTime: 'number,required',
      deadTime: 'number,required',
      medal: 'number,required',
    },
  });
}], ContestCtrl.create);


/* DELETE */
router.delete('/:contestId', ContestCtrl.delete);


module.exports = router;
