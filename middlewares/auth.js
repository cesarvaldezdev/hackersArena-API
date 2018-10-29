const bcrypt = require('bcrypt');
const { TokenCtrl } = require('../controllers');
const { User, Token } = require('../models');

const saltRounds = 10;

class Auth {
  static async register(req, res, next) {
    const user = User.create(req);
    // Crear el token
    const hash = bcrypt.hashSync(`${user.name}${new Date()}`, saltRounds);
    TokenCtrl.create({
      token: hash,
      createdAt: new Date(),
      duration: 12,
      type: 'Login',
      active: 1,
      aliasUser: user.aliasUser,
    });
    res.send({
      data: {
        hash,
      },
    }).status(201); // Sucesfully created
    next();
  }

  static async login(req, res, next) {
    const user = User.get(req.params.userAlias);
    const token = Token.get(user.userAlias);
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

  static async logout(req, res, next) {
    const token = Token.get(req.aliasUser);
    if (token.status === 1) {
      // Change status to 0
    } else {
      // Status alredy 0
    }
    res.status(200).send({ message: 'Logout' });
    next();
  }

  static async session(req, next) {
    const token = Token.get(req.aliasUser);
    if (token.status === 1) {
      next();
    } else {
      // Status is inactive
    }
  }
}

module.exports = Auth;
