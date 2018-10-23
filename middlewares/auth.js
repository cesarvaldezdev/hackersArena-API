const bcrypt = require('bcrypt');
const { TokenCtrl } = require('../controllers');
const { User, Token } = require('../models');

class Auth {
  static async register(req, res, next) {
    const user = User.create(req);
    let tkn;
    // Crear el token
    bcrypt.hash(`${user.name}${new Date()}`, process.env.SECRET, (err, hash) => {
      TokenCtrl.create({
        token: hash,
        createdAt: new Date(),
        duration: 12,
        type: 'Loggin session',
        active: 1,
        aliasUser: user.aliasUser,
      });
      tkn = hash;
    });
    res.send({
      data: {
        tkn,
      },
    }).status(201); // Sucesfully created
    next();
  }

  static async login(req, res, next) {
    const user = User.get(req);
    const token = Token.get(user.aliasUser);
    if (token.status === 1) {
      // go to home page
    } else {
      TokenCtrl.create(req);
      res.status(200).send({ message: 'Session started' });
    }
    next();
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
