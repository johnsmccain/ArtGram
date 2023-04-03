import jwt from 'jsonwebtoken';
import User from '../models/user';

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(403).send({ error: 'No token provided' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err.message);
      return res.status(401).send({ error: 'Invalid token' });
    }
    const { id } = payload;
    req.userId = id;
    next();
  });
};

const refreshAccessToken = async (req, res) => {
  console.log('refreshing access token with headers: ', req.headers);
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  try {
    // verify the access token and extract user id
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userId = decodedAccessToken.id;
    console.log(userId);
    // check if the access token has expired
    if (decodedAccessToken.exp < Date.now() / 1000) {
      // get the refresh token from the request cookies
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
      }

      // verify the refresh token and extract user id
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (decodedRefreshToken.id !== userId) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // generate a new access token
      const newAccessToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '15m',
        }
      );

      // send the new access token in the response along with user data
      const user = await User.findById(userId);
      res.json({ accessToken: newAccessToken, user });
    } else {
      // access token is valid, send user data in the response
      const user = await User.findById(userId);
      res.json({ user: user.toJSON() });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid access token' });
  }
};

export { isLoggedIn, refreshAccessToken };
