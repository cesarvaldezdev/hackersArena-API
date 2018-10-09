const router = require('express').Router();
const { ProblemCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', ProblemCtrl.getAll);
router.get('/:problemId', ProblemCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      id_doc: 'number,required',
      testTime: 'number,required',
      testMemory: 'number,required',
      attempts: 'number,required',
      solved: 'number,required',
      alias_User: 'alias,required',
      id_Category: 'number,required',
    },
  });
},ProblemCtrl.create);

router.put('/:problemId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          id_doc: 'number,required',
          testTime: 'number,required',
          testMemory: 'number,required',
          attempts: 'number,required',
          solved: 'number,required',
          alias_User: 'alias,required',
          id_Category: 'number,required',
        },
      });
    }],ProblemCtrl.create);

router.delete('/:problemId', ProblemCtrl.delete);

module.exports = router;
