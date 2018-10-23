// FORMAT OF TOKEN
// Authorization: Bearer <access_token>


/**
 * Validates a token
 * @param  {object}   req  body of the request
 * @param  {object}   res  body of the response
 * @param  {Function} next calls next middleware
 * @return {[type]}        [description]
 */
function verifyToken(req, res, next) {
  // Get auth header value.authorizati.authorization
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
    res.sendStatus(403);
  }
}


module.exports = verifyToken;
