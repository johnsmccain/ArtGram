import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import User from '../models/user';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token';

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
              const accessToken = jwt.sign({ savedUser }, ACCESS_TOKEN_SECRET, {
                expiresIn: 1200,
              });
              res.setHeader('Authorization', `Bearer ${accessToken}`);
              res.status(200).send({
                message: 'Logged in successfully',
                accessToken,
                user: savedUser,
              });
            } else {
              res.status(403).json({ error: 'Invalid password' });
            }
          });
      });
    } catch (error) {
      console.log(error);
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
