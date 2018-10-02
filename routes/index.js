const router = require('express').Router();
const verdictsRouter = require('./verdicts');

router.get('/', (req, res) => res.send('ExpressJS 101 API'));

router.use('/verdicts', verdictsRouter);

module.exports = router;
