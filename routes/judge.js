const router = require('express').Router();
const judge = require('../judge');

//router.get('/judge', judge.localTest);
router.post('/', (req, res) => {
  console.log(req.body);
  //middlewares.auth.registerUser;
  res.send(judge.test(
    req.body.source,
    req.body.input,
    req.body.time,
    req.body.memory,
    req.body.language,
  ));
});

module.exports = router;
