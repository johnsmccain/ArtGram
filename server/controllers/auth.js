import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import User from '../models/user';

class AuthController {
  static async logIn(req, res) {
    try {
      const authToken = req.header('Authorization').split(' ')[1];
      const auth = Buffer.from(authToken, 'base64').toString('utf8');
      const [email, password] = auth.split(':');
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      const user = await User.findOne({ email: email, password: hash });
      if (!user) {
        res.status(403).send({ error: 'User not found' });
        return;
      }
      key = `auth_${uuidv4()}`;
      redisClient.set(key, user._id.toString(), 86400);
      req.user = user;
      res.status(200).send({ message: 'Logged in successfully' });
    } catch (e) {
      res.status(403).send({ error: 'User not found' });
    }
  }
  static async logOut(req, res) {
    try {
      const token = req.header('X-Token');
      const key = `auth_${token}`;
      const userId = await redisClient.get(key);
      if (!userId) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
      }
      const user = User.findOne({ _id: ObjectId(userId) });
      if (!user) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
      }
      await redisClient.del(key);
      res.status(204).send({});
    } catch (error) {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }

  static async resetPassword(req, res) {}
}

export default AuthController;
