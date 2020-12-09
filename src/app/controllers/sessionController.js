// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = {
//   async register(req, res) {
//     const { name, email, provider } = req.body;
//     try {
//       if (await User.findOne({ where: { email } }))
//         return res.status(400).send({ error: 'email já cadastrado' });

//       const user = await User.create(req.body);

//       user.password_hash = undefined;

//       return res.json({
//         name,
//         email,
//         provider,
//         token: generateToken({ id: user.id }),
//       });
//     } catch (error) {
//       return res.status(400).send({ error: 'Falha no registro' });
//     }
//   },

//   async authenticate(req, res) {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//       return res.status(400).send({ erro: 'Usuário não cadastrado' });
//     }

//     if (!(await bcrypt.compare(password, user.password))) {
//       return res.status(400).send({ erro: 'Senha inválida' });
//     }

//     user.password = undefined;

//     return res.json({
//       user,
//       token: generateToken({ id: user.id }),
//     });
//   },
// };
