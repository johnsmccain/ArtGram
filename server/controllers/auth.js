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

    jwt.sign(refreshToken, '', { expiresIn: 1 }, (error) => {
      if (error) {
        res.status(401).send({ error: 'not signed' });
        return;
      }
      res.status(204).send({ message: 'Logged Out' });
      res.clearCookies('refreshToken');
    });
  }

  static async verifyToken(req, res) {
    const refreshToken = req.headers.authorization?.split(' ')[1];
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: 'Authentication failed: no token provided' });
    }

    try {
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      console.log('It is ' + decodedToken.id);
      const user = await User.findById(decodedToken.id);
      console.log(user);
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Authentication failed: user not found' });
      }

      res.status(200).send({ user });
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed: invalid token' });
    }
  }

  static async refreshToken(req, res) {
    const refreshToken = req.cookies['refreshToken'];
    console.log(
      'Refreshing token: ' +
        JSON.stringify({
          cookies: req.cookies,
          headers: req.headers,
        })
    );

    if (!refreshToken) {
      return res.status(401).send({ message: 'Refresh token not found' });
    }

    try {
      console.log(`refresh token is ${refreshToken}`);
      // Verify the refresh token using the secret key
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = decoded.userId;

      console.log('Authenticating ' + userId);
      // Generate a new access token using the user id
      const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      // Send the new access token back to the client
      return res.send({ accessToken });
    } catch (err) {
      return res.status(401).send({ message: 'Invalid refresh token' });
    }
  }

  static async resetPassword(req, res) {}
}

export default AuthController;
