const router = require('express').Router();
const middlewares = require('../middlewares');

router.post('/register', (req, res, next) => {
  middlewares.auth.register(req, res, next);
  }, (req, res) => {
    if (req.body.message.token) {
      res.header('Authorization', `Bearer ${req.body.message.token}`);
    }
    res.status(200).send({ message: req.body.message });
  });
// router.post('/register', middlewares.auth.register);
// router.post('/register/:token', middlewares.auth.confirm);
// router.post('/login', middlewares.auth.login);
// router.post('/logout', middlewares.auth.logout);
module.exports = router;
