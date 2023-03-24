import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).send({ error: 'No token provided' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(403).send({ error: 'Invalid token' });
    const { id } = payload;
    req.userId = id;
    next();
  });
};

const refreshAccessToken = (req, res, next) => {
  const refreshToken = req.cookies['refreshToken'];
  console.log('refreshToken', refreshToken);

  if (refreshToken === null) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ error: 'Invalid token' });

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 1200,
      }
    );
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    next();
  });
};

export { isLoggedIn, refreshAccessToken };
