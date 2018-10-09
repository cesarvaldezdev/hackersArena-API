const router = require('express').Router();
const { ContestCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', ContestCtrl.getAll);
router.get('/:contestId', ContestCtrl.get);

router.post('/',(req, res, next) => {
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
},ContestCtrl.create);

router.put('/:contestId',[(req, res, next) => {
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
    }],ContestCtrl.create);

router.delete('/:contestId', ContestCtrl.delete);

module.exports = router;
