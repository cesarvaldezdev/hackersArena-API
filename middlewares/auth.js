const bcrypt = require('bcrypt');
const { User, Token } = require('../models');

class Auth {
  register(req, res, next) {
    user = User.create(req);

    // Crear el token
    bcrypt.hash(`${user.name}${date}`, process.env.SECRET, Token.create({
        token,
        createdAt: new Date(),
        duration: 12,
        type: 's',
        active: 1,
        userId: user.id
      })
    );

    res.send({
      data: {
        hash,
      }
    }).status(201);
  }

  login(req, res, next) {
    user = User.get(req);

    if (token.active(token)){
      
    } else {
      //token.create{}
    }
    // Create token
  }

  logout(token) {
    token.destroy();
  }

  session(token) {
    if (token.active(token)) {
      next()
    } else {
      return next({})
    }
  }
}
