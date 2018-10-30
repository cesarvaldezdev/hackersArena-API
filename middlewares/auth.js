const bcrypt = require('bcrypt');
const { TokenCtrl } = require('../controllers');
const { User, Token } = require('../models');

const saltRounds = 10;
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
  static async register(req, res, next) {
    const data = await TokenCtrl.get(req.params.emailToken);
    if (data !== 0) { // Confirmation token exists
      const user = User.create(req);
      // Crear el token con el nombre del usuario+la fecha actual
      const hash = bcrypt.hashSync(`${user.name}${new Date()}`, saltRounds);
      TokenCtrl.create({
        token: hash,
        createdAt: new Date(),
        duration: 12,
        type: 'FirstLogin',
        active: 1,
        aliasUser: user.aliasUser,
      });
      res.send({
        data: {
          hash,
        },
      }).status(201).send({ message: 'User created!' }); // Sucessfully created
      next();
    } else {
      // Token not match
      res.status(401).send({ error: 'Invalid or inactive token' });
    }
  }

  /**
   * This metod allows to login to the page if the user and password match,
   * then creates a token for the started session.
   * @param  {object}   req body of the request
   * @param  {object}   res body of the response
   * @param  {Function} next next funtion to execute next
   * @return {Promise}       returns a the started session
   */
  static async login(req, res, next) {
    const user = User.get(req.params.userAlias);
    const token = Token.get(req.params.userAlias);
    if (token.status === 1) {
      // go to home page, alredy logged
    }
    if (user.length === 0) {
      // user not found
      res.status(400).send({ message: 'User doesnt exist' });
    } else {
      if (bcrypt.compareSync(req.params.userPassword, user.password)) {
        TokenCtrl.create(req, res, 'Login');
        res.status(200).send({ message: 'Session started' });
      } else {
        // Passwords dont match
        res.status(400).send({ message: 'Incorrect password' });
      }
      next();
    }
  }

  /**
   * This metod ends the active session of a user by changing the
   * token status to 0.
   * @param  {object}   req body of the request
   * @param  {object}   res body of the response
   * @param  {Function} next next funtion to execute next
   * @return {Promise}       returns the ended session
   */
  static async logout(req, res, next) {
    const token = Token.get(req.params.aliasUser);
    if (token.status === 1) {
      // Change status to 0
    } else {
      // Status alredy 0
    }
    res.status(200).send({ message: 'Logout' });
    next();
  }

  /**
   * This metod verify if the session is still active,
   * if it is, allows to continue in the page.
   * @param  {object}   req body of the request
   * @param  {object}   res body of the response
   * @param  {Function} next next funtion to execute next
   * @return {Promise}       returns a created user
   */
  static async session(req, res, next) {
    const token = Token.get(req.aliasUser);
    if (token.status === 1) {
      next();
    } else {
      // Status is inactive
      res.status(401).send({ error: 'Inactive token. ' });
    }
  }
}

module.exports = Auth;
