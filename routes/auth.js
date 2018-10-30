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
router.get('/register/:token', middlewares.auth.confirm);

// router.get('/register/:token', (req, res, next) => {
//   middlewares.auth.confirm(req, res, next);
//   }, (req, res) => {
//     if (false) {
//       console.log("algo");
//     }
//     res.status(200).send({ message: req.body.message });
//   });




// router.post('/login', middlewares.auth.login);
// router.post('/logout', middlewares.auth.logout);
//
// router.post('/login', (req, res, next) => {
//   middlewares.auth.login(req, res, next);
// }, (req, res) => {
//   if (req.body.message.token) {
//     res.header('Authorization', `Bearer ${req.body.message.token}`);
//   }
//   res.status(200).send({ message: req.body.message });
// });
//
// router.get('/logout',
//   [
//     middlewares.auth.isLogged,
//   ],
//   (req, res, next) => {
//     middlewares.auth.logout(req, res, next);
//   }, (req, res) => {
//     res.status(200).send({ message: req.body.message });
//   });

module.exports = router;
