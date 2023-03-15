import User from '../models/user';
import redisClient from '../utils/redis';

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header('X-Token');
    const key = `auth_${token}`;

    const userId = await redisClient.get(key);

    if (!userId) {
      res.status(401).send({ error: 'Unauthorised' });
      return;
    }
    const user = await User.findOne({ _id: userId });
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorised' });
  }
};

export default isLoggedIn;
