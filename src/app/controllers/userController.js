import User from '../models/Users';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 31104000 });
}

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async register(req, res) {
    const { name, email, password_hash, provider } = req.body;

    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'email já cadastrado' });

      const user = await User.create({ name, email, password_hash, provider });

      user.password = undefined;

      return res.json({
        name,
        email,
        provider,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no registro' });
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).send({ erro: 'Usuário não cadastrado' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ erro: 'Senha inválida' });
    }

    user.password = undefined;

    return res.json({
      user,
      token: generateToken({ id: user.id }),
    });
  },
};
