// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const middlewares = require('../middlewares')

/* Router initialization */
const categoriesRouter = require('./categories');
const contestsRouter = require('./contests');
const countriesRouter = require('./countries');
const languagesRouter = require('./languages');
const problemsRouter = require('./problems');
const solutionsRouter = require('./solutions');
const universitiesRouter = require('./universities');
const usersRouter = require('./users');
const verdictsRouter = require('./verdicts');
const authRouter = require('./auth');
//const mailer = require('../mail');
const rolesRouter = require('./roles');
const allowsRouter = require('./allows');
const userRolesRouter = require('./userroles');
const roleAllowsRouter = require('./roleallows');
//const judgeRouter = require('./judge');

router.get('/', (req, res) => { res.status(200).send('Hackers Arena v1.0'); });

/* Router association */
router.use('/categories', categoriesRouter);
router.use('/contests', contestsRouter);
router.use('/countries', countriesRouter);
router.use('/languages', languagesRouter);
router.use('/problems', problemsRouter);
router.use('/solutions', solutionsRouter);
router.use('/users', usersRouter);
router.use('/universities', universitiesRouter);
router.use('/verdicts', verdictsRouter);
router.use('/roles', rolesRouter);
router.use('/allows', allowsRouter);
router.use('/userroles', userRolesRouter);
router.use('/roleallows', roleAllowsRouter);
//router.use('/judge', judgeRouter);
router.use('/', authRouter);


module.exports = router;
