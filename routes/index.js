/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();


/* Router initialization */
const categoriesRouter = require('./categories');
const contestsRouter = require('./contests');
const countriesRouter = require('./countries');
const emailRouter = require('./email');
const languagesRouter = require('./languages');
const loginRouter = require('./login');
const problemsRouter = require('./problems');
const solutionsRouter = require('./solutions');
const universitiesRouter = require('./universities');
const usersRouter = require('./users');
const verdictsRouter = require('./verdicts');
//const mailer = require('../mail');

router.get('/', (req, res) => res.send('Hackers Arena v1.0'));
// router.get('/', (req, res) =>{
//   let mailOptions = {
//     to: 'pancho@mail.com',
//     subject: 'Hello testing',
//     text: `algunaUrlVaAqui/${token}`,
//     html: '<b>Hello World</b>',
//   };
//   mailer.sendMail(mailOptions);
// });

/* Router association */
router.use('/categories', categoriesRouter);
router.use('/contests', contestsRouter);
router.use('/countries', countriesRouter);
router.use('/email', emailRouter);
router.use('/languages', languagesRouter);
router.use('/login', loginRouter);
router.use('/problems', problemsRouter);
router.use('/solutions', solutionsRouter);
router.use('/users', usersRouter);
router.use('/universities', universitiesRouter);
router.use('/verdicts', verdictsRouter);


module.exports = router;
