import bcrypt from 'bcrypt';
import User from '../models/user';
import Art from '../models/art';

class UsersController {
  static async createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ error: 'Submit all required fields' });
      return;
    }
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(201).send({
      id: `${user.id}`,
      name: `${user.name}`,
      password: `${user.password}`,
    });
  }

  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(201).json({ user });
      }
    } catch (error) {
      res.status(404).send({ error: 'User not found' });
    }
  }
  8;
  static async myLikes(req, res) {
    const allArts = await Art.find({ likes: req.userId });
    res.status(200).send(allArts);
  }

  static resetPassword(req, res) {}
}

export default UsersController;
