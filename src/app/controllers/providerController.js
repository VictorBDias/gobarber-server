import User from '../models/User';
import File from '../models/File';

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        // incluir todas informações de File e nomealo como 'avatar'
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(users);
  },
};
