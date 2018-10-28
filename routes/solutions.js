// FIXME Corregir errores de linter
const router = require('express').Router();
const { SolutionCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', SolutionCtrl.getAll);
// FIXME falta validar el parametro
router.get('/:solutionId', SolutionCtrl.get);

router.post('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      date : 'datetime,required',
      time : 'number,required',
      memory : 'number,required',
      size : 'number,required',
      alias_User : 'alias,required',
      id_Problem : 'number,required',
      id_Language : 'number,required',
      id_Verdict : 'number,required',
    },
  });
},SolutionCtrl.create);

// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones, por lo cual al parecer el metodo del controlador esta mal
router.put('/:solutionId',[(req, res, next) => {
      middlewares.validator.validate(req, res, next, {
        body: {
          date : 'datetime,required',
          time : 'number,required',
          memory : 'number,required',
          size : 'number,required',
          alias_User : 'alias,required',
          id_Problem : 'number,required',
          id_Language : 'number,required',
          id_Verdict : 'number,required',
        },
      });
    }],SolutionCtrl.create);

// FIXME falta validar el parametro
router.delete('/:solutionId', SolutionCtrl.delete);

module.exports = router;
