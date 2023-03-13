import crypto from 'crypto';
import User from '../models/user';

class UsersController {
  static async postNewUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ error: 'Submit all required fields' });
    }
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      res.json({ error: 'Email already exists' });
      return;
    }
    console.log(`The password saved is ${typeof password}`);
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    console.log(hash);
    const user = await User.create({ name, email, password: hash });
    user.save();
    res.status(200).send({
      id: `${user.id}`,
      name: `${user.name}`,
      password: `${user.password}`,
    });
  }
}

export default UsersController;
