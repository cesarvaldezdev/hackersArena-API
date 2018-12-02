const nodemailer = require('nodemailer');


class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // 'smtp.ethereal.email',
      port: process.env.MAIL_PORT, // 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
    });
    this.mailOptions = {
      from: '"Hackers Arena" <testingmail@example.com>',
    };

    // Validar que el transporter tiene una conexion valida
    // this.transporter.verify();
  }


  sendMail(options) {
    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      /* LINTER QUICKFIX */
      return info;
    });
  }
}

module.exports = new Mailer();
