const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 31104000 });
}

module.exports = {
  // async register(req, res) {
  //   const { name, email, provider, password } = req.body;
  //   try {
  //     if (await User.findOne({ where: { email } }))
  //       return res.status(400).send({ error: 'email já cadastrado' });

  //     const user = await User.create(req.body);

  //     user.password_hash = undefined;

  //     return res.json({
  //       name,
  //       email,
  //       provider,
  //       token: generateToken({ id: user.id }),
  //     });
  //   } catch (error) {
  //     return res.status(400).send({ error: 'Falha no registro' });
  //   }
  // },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ erro: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).send({ erro: 'Invalid password' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: generateToken({ id: user.id }),
    });
  },
};
