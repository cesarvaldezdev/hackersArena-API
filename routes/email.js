/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const mailer = require('../mail');
// const { EmailCtrl } = require('../controllers');
// const middlewares = require('../middlewares');


router.get('/email', (req, res) => {
  const mailOptions = {
    to: 'pancho@gmail.com', // list of receivers
    subject: 'Hello testing', // subject line
    text: `Hello world?/${token}`, // plain text body
    html: '<b>Hello world?</b>', // html body
  };
  mailer.sendMail(mailOptions);
});


module.exports = router;
