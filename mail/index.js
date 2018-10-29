const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'i3scylkitog66jiq@ethereal.email', // generated ethereal user
        pass: 'nedUhRS6zbsYUqej7c', // ,generated ethereal password
      },
    });
    this.mailOptions = {
      from: '"Testing mail" <testingmail@hackerarena.com',
    };

    // Validar que el transporter si tenga una conexión Validar
    // this.transporter.verify();
  }

  sendMail(options) {
    console.log('aqui debe mandar correo');

    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return true;
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
}

module.exports = new Mailer();
