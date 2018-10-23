/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UniversityCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all universities
router.get('/', UniversityCtrl.getAll);
// Get a university by id
router.get('/:universityId', UniversityCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',
    },
  });
}, UniversityCtrl.create);


/* PUT */
router.put('/:universityId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',
    },
  });
}], UniversityCtrl.create);


/* DELETE */
router.delete('/:universityId', UniversityCtrl.delete);


module.exports = router;
