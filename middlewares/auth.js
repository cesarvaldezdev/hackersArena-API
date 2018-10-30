const { Token } = require('../models');

class Auth {
  constructor() {
    this.salt = process.env.SALT;

    // Binding this to not loose context on router
    this.haveSession = (req, res, next) => {
      const token = this.getHeaderToken(req.headers.authorization);
      this.token = Token.get(token);
      if (this.isActive()) {
        // Add to the request a session object with user and all session information
        //
        // req.session = {
        //   token: this,
        //   user: User.get(this.token.userId),
        // }
        next();
      } else {
        next({
          status: 401,
          message: 'You need to be logged',
        });
      }
    };


    /**
     * [verifyAdminRole description]
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     * Authorization: Bearer <access_token>
     */
    this.verifyAdminRole = (req, res, next) => {
      const user = req.body;

      if (user.role === 'ADMIN') {
        return next();
      }
      return res.status(403).json({
        ok: false,
        err: {
          message: 'User does not have admin privileges',
        },
      });
    };


    /**
     * Validates a token
     * @param  {object}   req  body of the request
     * @param  {object}   res  body of the response
     * @param  {Function} next calls next middleware
     * @return {[type]}        [description]
     */
    this.verifyToken = (req, res, next) => {
      // Get auth header value.authorization
      const bearerHeader = req.headers['.authorization'];

      // Check if bearer is undefined
      if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');

        // Get token from array
        const bearerToken = bearer[1];

        // Set the token
        req.token = bearerToken;

        // Next middleware
        next();
      } else {
        // Forbidden
        res.status(403).json({
          ok: false,
          err: {
            message: 'Forbidden',
          },
        });
      }
    };
  }


  static havePermissions(req, res, next) {
    // Validate if the user can do this action
    // hint: can take the route to make sure about which is the action
    //
    // req.session.user.canDo('edit')
  }

  static getHeaderToken(bearer = '') {
    return bearer.split(' ')[1];
  }

  isActive() {
    const now = new Date();
    if (now + this.token.expires > this.token.created + this.token.expires) {
      this.token.deactive();
      return false;
    } return true;
  }
}

module.exports = new Auth();
