const router = require('express').Router();
const { ProblemCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', ProblemCtrl.getAll);
router.get('/:userAlias', ProblemCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      title: 'word,required',
      difficulty: 'word,required',
      id_author: 'number,required',
      score: 'number,required',
      testTime: 'word,required',
      memory: 'number,required',
      description: 'word,required',
      input: 'word,required',
      output: 'word,required',
    },
  });
},ProblemCtrl.create);

router.put('/:problemId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          title: 'word,required',
          difficulty: 'word,required',
          id_author: 'number,required',
          score: 'number,required',
          testTime: 'word,required',
          memory: 'number,required',
          description: 'word,required',
          input: 'word,required',
          output: 'word,required',
        },
      });
    }],ProblemCtrl.create);

router.delete('/:problemId', ProblemCtrl.delete);

module.exports = router;
