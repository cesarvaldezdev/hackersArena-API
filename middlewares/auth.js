const bcrypt = require('bcrypt');

class Auth {
  register(req, res, next) {
    user = User.create(req);

    // Crear el token
    bcrypt.hash('asdfasd', proces)

    res.send({
      data: {
        hash
      }
    }).status(201);
  }


  login(req, res, next) {
    user = User.get(req);

    //Validar si ya hay token
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
