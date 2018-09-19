const { Router } = require('express');

// const addDate = require('../middlewares');

const router = Router();

router.get('/', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'juan',
      email: 'juan@correo',
    },
    {
      id: 2,
      name: 'juan2',
      email: 'juan2@correo',
    },
  ];

  const json = {
    response: 'ok',
    data: users,
    data2: req.body,
    total: 2,
  };

  res.send(json);
});

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
