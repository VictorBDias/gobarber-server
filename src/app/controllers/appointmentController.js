import { parseISO, isAfter, startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

const Yup = require('yup');

module.exports = {
  async index(req, res) {
    const { page } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  },

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    const { date, provider_id } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ error: 'failure to validate' });
    }

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(400).send({
        error: 'You can only create a appointment with a provider',
      });
    }

    const parsedDate = parseISO(date);
    const past = isAfter(parsedDate, new Date());

    if (!past) {
      return res.status(400).send({
        error: 'It is not possible to create a appointment on past dates',
      });
    }

    const timeConflict = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: startOfHour(parseISO(date)),
      },
    });

    if (timeConflict) {
      return res.status(400).send({
        error: 'A appointment is alredy booked in this date',
      });
    }

    try {
      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date,
      });
      return res.json(appointment);
    } catch (error) {
      return res.status(400).send({ error: 'Appointment creation failed' });
    }
  },

  // async list(req, res) {
  //   const appointments = await Appointment.findAll();
  //   return res.json(appointments);
  // },
};
