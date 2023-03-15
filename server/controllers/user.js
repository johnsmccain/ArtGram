import crypto from 'crypto';
import User from '../models/user';

class UsersController {
  static async createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ error: 'Submit all required fields' });
    }
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await User.create({ name, email, password: hash });
    user.save();
    res.status(201).send({
      id: `${user.id}`,
      name: `${user.name}`,
      password: `${user.password}`,
    });
  }
}

export default UsersController;
