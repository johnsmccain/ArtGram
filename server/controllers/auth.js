import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import User from '../models/user';
import { Types } from 'mongoose';

class AuthController {
  static async logIn(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        res
          .status(403)
          .json({ error: 'Please, enter your email and password' });
        return;
      }
      User.findOne({ email: req.body.email }).then((savedUser) => {
        if (!savedUser) {
          res.status(403).json({ error: 'Invalid email' });
          return;
        }
        bcrypt
          .compare(req.body.password, savedUser.password)
          .then((isMatch) => {
            if (isMatch) {
              const key = `auth_${uuidv4()}`;
              redisClient.set(key, savedUser._id.toString(), 86400);
              res.status(200).send({ message: 'Logged in successfully' });
            } else {
              res.status(403).json({ error: 'Invalid password' });
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async xlogIn(req, res) {
    try {
      const authToken = req.header('authorization').split(' ')[1];
      console.log(req);
      console.log('Auth token: ' + authToken);
      const auth = Buffer.from(authToken, 'base64').toString('utf8');
      const [email, password] = auth.split(':');
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      const user = await User.findOne({ email: email });
      // console.log(!user);
      // if (!user) {
      //   res.status(403).send({ error: 'User not found' });
      //   return;
      // }
      const key = `auth_${uuidv4()}`;
      redisClient.set(key, user._id.toString(), 86400);
      res.status(200).send({ message: 'Logged in successfully' });
    } catch (e) {
      res.status(403).send({ error: 'User not found' });
    }
  }
  static async logOut(req, res) {
    const token = req.header('X-Token');
    const key = `auth_${token}`;

    const userId = await redisClient.get(key);

    if (!userId) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const user = User.findOne({ _id: new Types.ObjectId(userId) });
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    await redisClient.del(key);
    res.status(204).send({});
  }

  static async resetPassword(req, res) {}
}

export default AuthController;
