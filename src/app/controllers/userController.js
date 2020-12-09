const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, email, provider } = req.body;
    try {
      if (await User.findOne({ where: { email } }))
        return res.status(400).send({ error: 'email já cadastrado' });

      const user = await User.create(req.body);

      user.password_hash = undefined;

      return res.json({
        name,
        email,
        provider,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Falha no registro' });
    }
  },

  async list(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
};
