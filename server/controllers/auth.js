import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

class AuthController {
  static async logIn(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        res
          .status(403)
          .json({ error: 'Please, enter your email and password' });
        return;
      }
      User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          res.status(403).json({ error: 'Invalid email' });
          return;
        }
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const accessToken = jwt.sign(
              { id: user._id },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: 1200,
              }
            );
            const refreshToken = jwt.sign(
              { id: user._id },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: '7d',
              }
            );
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.setHeader('Authorization', `Bearer ${accessToken}`);
            res.status(200).send({
              accessToken,
              refreshToken,
              user,
            });
          } else {
            res.status(403).json({ error: 'Invalid password' });
          }
        });
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(403);
    }
  }

  static async logOut(req, res) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const userId = req.userId;
    console.log('The userId is ' + userId);
    if (!userId) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    jwt.sign(authHeader, '', { expiresIn: 1 }, (error) => {
      if (error) {
        res.status(401).send({ error: 'not signed' });
        return;
      }
      res.status(204).send({ message: 'Logged Out' });
      res.clearCookies('refreshToken');
    });
  }

  static async resetPassword(req, res) {}
}

export default AuthController;
