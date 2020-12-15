const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ erro: 'Requires authentication' });

  const parts = authHeader.split(' ');

  if (!parts.lenght === 2)
    return res.status(401).send({ erro: 'Token error (%)' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ erro: 'Token type error' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ erro: 'invalid token' });

    req.userId = decoded.id;
    return next();
  });
  return this;
};
