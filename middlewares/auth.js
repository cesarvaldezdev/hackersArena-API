const bcrypt = require('bcrypt');
const { TokenCtrl, UserCtrl } = require('../controllers');
const { User, Token } = require('../models');
const mailer = require('../mail');

/**
 * Class for all the Authentication methods :
 * - login
 * - logout
 * - Registrer
 *
 * This class also creates the tokens if needed.
 */
class Auth {
  /**
   * This metod confirms a registration process.
   * If the token is still active, the user registration process continue.
   * @param  {object}   req body of the request
   * @param  {object}   res body of the response
   * @param  {Function} next next funtion to execute next
   * @return {Promise}       returns a created user
   */
  // FIXME el proceso de registro sigue siendo trabajo de user, y ahi se deben usar los metodos de auth para crear el token en caso de ser necesario
   static async register(req, res, next) {
     try{
       var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
       const passhash = bcrypt.hashSync(req.body.password, salt);
       const user = new User({
         alias: req.body.alias,
         name: req.body.name,
         lastName: req.body.lastName,
         score: req.body.score,
         email: req.body.email,
         password: passhash,
         idUniversity: req.body.idUniversity,
         idCountry: req.body.idCountry,
         status: 0,
       });
       const data = await user.save();

       if(data === 0){
         const hash = bcrypt.hashSync(`${user.name}${new Date()}`, salt);
         var dateNow = new Date();
         var dateThen = new Date();
         dateThen.setHours(dateThen.getHours() + 12); //12 HRS (4 - 23 only)
         const tok = new Token({
           token: hash,
           createdAt: dateNow,
           expires: dateThen,
           type: 'Email Token',
           status: 1,
           aliasUser: user.alias,
         });
         const dataToken = await tok.save();
         if (dataToken === 0) {
           req.body.message = { token: hash };
           let mailOptions = {
             to: user.email,
             subject: 'Confirm Account',
             text: `localhost:8080/register/${tok.token}`, // FIXME las urls no se deben hardcodear, y se deben tomar de configuraciones de entorno
             html: '<a href="`${tok.token}`" >link text</a>',
           };
           mailer.sendMail(mailOptions); // FIXME el envio de correos debe ser asincrono
           // res.send({data: {hash,},}).status(201); // Sucesfully created
         }else {req.body.message = { token: "NaN" };}
       } else {
         res.status(401).send({ error: 'Invalid user' });
       }
       next();
     } catch(e){
       return next(e);
     }
   }


  static async confirm(req, res) {
    const data = await TokenCtrl.get(req.body.token); // FIXME el token no se debe mandar en el cuerpo del request, siempre deberia ir en las cabeceras
    if (data) { // Confirmation token exists
      const user = await UserCtrl.get(data.aliasUser);
      // Crear el token con el nombre del usuario+la fecha actual
      user.status = 1;
      const dataUser = await user.save();
      if(dataUser === 0){
          res.status(201).send({ message: 'User created!' }); // Sucessfully created
      }else{
        res.status(401).send({ error: 'Something has gone wrong' });
      }
      next();
    } else {
      // Token not match
      res.status(401).send({ error: 'Invalid or inactive token' });
    }
  }


  // static async confirm(req, res, next) {
  //   const data = await TokenCtrl.get(req.params.emailToken);
  //   if (data) { // Confirmation token exists
  //     // Crear el token con el nombre del usuario+la fecha actual
  //     const hash = bcrypt.hashSync(`${user.name}${new Date()}`, process.env.SALT_ROUNDS);
  //     // TokenCtrl.create({
  //     //   token: hash,
  //     //   createdAt: new Date(),
  //     //   duration: 12,
  //     //   type: 'FirstLogin',
  //     //   active: 1,
  //     //   aliasUser: user.aliasUser,
  //     // });
  //     // res.send({
  //     //   data: {
  //     //     hash,
  //     //   },
  //   // })
  //     const user = new User({User.});
  //     res.status(201).send({ message: 'Email confirmed!' }); // Sucessfully created
  //     next();
  //   } else {
  //     // Token not match
  //     res.status(401).send({ error: 'Invalid token' });
  //   }
  // }
 //
 //  /**
 //   * This metod allows to login to the page if the user and password match,
 //   * then creates a token for the started session.
 //   * @param  {object}   req body of the request
 //   * @param  {object}   res body of the response
 //   * @param  {Function} next next funtion to execute next
 //   * @return {Promise}       returns a the started session
 //   */
 //  static async login(req, res, next) {
 //    const user = User.get(req.params.userAlias);
 //    const token = Token.get(req.params.userAlias);
 //    if (token.status === 1) {
 //      // go to home page, alredy logged
 //    }
 //    if (user.length === 0) {
 //      // user not found
 //      res.status(400).send({ message: 'User doesnt exist' });
 //    } else {
 //      if (bcrypt.compareSync(req.params.userPassword, user.password)) {
 //        TokenCtrl.create(req, res, 'Login');
 //        res.status(200).send({ message: 'Session started' });
 //      } else {
 //        // Passwords dont match
 //        res.status(400).send({ message: 'Incorrect password' });
 //      }
 //      next();
 //    }
 //  }
 //
 //  /**
 //   * This metod ends the active session of a user by changing the
 //   * token status to 0.
 //   * @param  {object}   req body of the request
 //   * @param  {object}   res body of the response
 //   * @param  {Function} next next funtion to execute next
 //   * @return {Promise}       returns the ended session
 //   */
 //  static async logout(req, res, next) {
 //    const token = Token.get(req.params.aliasUser);
 //    if (token.status === 1) {
 //      // Change status to 0
 //    } else {
 //      // Status alredy 0
 //    }
 //    res.status(200).send({ message: 'Logout' });
 //    next();
 //  }
 //
 //  /**
 //   * This metod verify if the session is still active,
 //   * if it is, allows to continue in the page.
 //   * @param  {object}   req body of the request
 //   * @param  {object}   res body of the response
 //   * @param  {Function} next next funtion to execute next
 //   * @return {Promise}       returns a created user
 //   */
 //  static async session(req, res, next) {
 //    const token = Token.get(req.aliasUser);
 //    if (token.status === 1) {
 //      next();
 //    } else {
 //      // Status is inactive
 //      res.status(401).send({ error: 'Inactive token. ' });
 //    }
 //  }
}

module.exports = Auth;
