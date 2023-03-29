import jwt from 'jsonwebtoken';
import User from '../models/user';

class AuthController {
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Please enter your email and password' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.status(200).send({
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async logOut(req, res) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        return res.status(400).send({ error: 'No refresh token found' });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, decoded) => {
          if (error) {
            return res.status(400).send({ error: 'Invalid refresh token' });
          }
          const userId = decoded.id;
          const user = await User.findById(userId);
          if (!user) {
            return res.status(400).send({ error: 'User not found' });
          }

          res.clearCookie('refreshToken');
          res.status(204).send({ message: 'Logged Out' });
        }
      );
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async verifyToken(req, res) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Authentication failed: no token provided' });
    }

    try {
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const user = await User.findById(decodedToken.id);
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
    console.log('refreshing token ' + req.headers);
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        return res.status(400).send({ message: 'Refresh token not found' });
      }

      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decodedToken.id);

      const accessToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '15m',
        }
      ); // generate new access token

      return res.send({ accessToken, user }); // send new access token
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal server' });
    }
  }
}

export default AuthController;
