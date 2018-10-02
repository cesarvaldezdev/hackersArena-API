const { Router } = require('express');

// const addDate = require('../middlewares');
const { UserCtrl } = require('../controllers'); // destructuring

const router = Router();

router.get('/', UserCtrl.getAll); // lo busca en controllers

router.get('/:userId', (req, res) => {
  const user = {
    id: req.params.userId,
    name: `juan${req.params.userId}`,
    email: `juan${req.params.userId}@correo`,
  };

  res.send(user);
});

router.post('/', (req, res) => {
  console.log(req.body);
  const json = {
    response: 'ok',
    data: {
      id: 100,
      name: req.body.name,
    },
  };

  res.send(json);
});

router.put('/:userId', (req, res) => {
  res.send('editado lindo');
});


module.exports = router;
