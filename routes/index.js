const router = require('express').Router();
const verdictsRouter = require('./verdicts');
const usersRouter = require('./users');
const universitiesRouter = require('./universities');
const countriesRouter = require('./countries');
const categoriesRouter = require('./categories');
const languagesRouter = require('./languages');

//router.get('/', (req, res) => res.send('ExpressJS 101 API'));

router.use('/verdicts', verdictsRouter);
router.use('/universities',universitiesRouter);
router.use('/users',usersRouter);
router.use('/countries',countriesRouter);
router.use('/categories',categoriesRouter);
router.use('/languages',languagesRouter);
module.exports = router;
