import crypto from 'crypto';
import User from '../models/user';

class AuthController {
  static async logIn(req, res) {
    try {
      const authToken = req.header('Authorization').split(' ')[1];
      const auth = Buffer.from(authToken, 'base64').toString('utf8');
      const [email, password] = auth.split(':');
      console.log(`The password saved is ${typeof password}`);
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      console.log(`The hash of ${password} is ${hash}`);
      const user = await User.findOne({ email: email, password: hash });
      if (!user) {
        res.status(403).send({ error: 'User not found' });
        return;
      }
      req.user = user;
      res.send({ message: 'Logged in successfully' });
    } catch (e) {
      res.status(403).send({ error: 'User not found' });
    }
  }
  static async logOut(req, res) {}

  static async resetPassword(req, res) {}
}

export default AuthController;
