const jwt = require ('jsonwebtoken');
//cathing expired token error

const {TokenExpiredError} = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status (401)
      .send ({message: 'Unauthorized! Access Token was expired!'});
  }

  return res.sendStatus (401).send ({message: 'Unauthorized!'});
};

verifyToken = (req, res, next) => {
  // console.log (req.headers);
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status (403).send ({message: 'No token provided!'});
  }

  jwt.verify (token, 'secret123', (err, decoded) => {
    if (err) {
      return catchError (err, res);
    }
    req.email = decoded.email;
    next ();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
