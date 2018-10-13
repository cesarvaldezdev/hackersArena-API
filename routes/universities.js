const router = require('express').Router();
const { UniversityCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', UniversityCtrl.getAll);
router.get('/:universityId', UniversityCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',
    },
  });
}, UniversityCtrl.create);

router.put('/:universityId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',
    },
  });
}], UniversityCtrl.create);

router.delete('/:universityId', UniversityCtrl.delete);

module.exports = router;
