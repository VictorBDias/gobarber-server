import User from '../models/Users';

module.exports = {
  async store(req, res) {
    const { name, email, password_hash, provider } = req.body;

    const user = await User.create({ name, email, password_hash, provider });

    return res.json(user);
  },

  async list(req, res) {
    const user = await User.find().populate();
    return res.send(user);
  },
};
