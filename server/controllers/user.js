// import bcrypt from 'bcrypt';
import User from '../models/user';
import Art from '../models/art';

const ignore = '-password, -createdAt, -updatedAt, -__v';

class UsersController {
  static async createUser(req, res) {
    const { name, email } = req.body;
    const photoURL = req?.body?.photoURL;
    if (!name || !email) {
      res.status(400).send({ error: 'Submit all required fields' });
      return;
    }
    const savedUser = await User.findOne(
      { email: email },
      '-createdAt, -updatedAt, -__v'
    );
    if (savedUser) {
      res.status(200).json( "Login" );
      return;
    }
    const user = {}
    if(photo){
      user = await User.create({ name, email, profileImage:photoURL });
    } else {
      user = await User.create({ name, email });
    }
    res.status(201).send({
      id: `${user.id}`,
      name: `${user.name}`,
    });
  }

  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id, ignore);
      if (user) {
        res.status(201).json({ user });
      }
    } catch (error) {
      res.status(404).send({ error: 'User not found' });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 20;
      const users = await User.find({}, ignore)
        .skip(page * limit)
        .limit(limit)
        .sort({ createdAt: 'desc' });
      res.status(201).json({ users: users });
    } catch (err) {
      res.status(404).send({ error: 'No users' });
    }
  }

  static async myLikes(req, res) {
    const allArts = await Art.find({ likes: req.userId });
    res.status(200).send(allArts);
  }

  static async follow(req, res) {
    if (req.params.id !== req.userId) {
      const userToFollow = await User.findByIdAndUpdate(req.params.id, ignore, {
        $addToSet: { followers: req.userId },
      });
      if (!userToFollow) {
        return res.status(400).send({ err: 'User not found' });
      }
      const userId = req.userId;
      const user = await User.findByIdAndUpdate(
        userId,
        ignore,
        {
          $addToSet: { following: req.params.id },
        },
        { new: true }
      );
      res.status(200).send({ user, userToFollow });
    } else {
      res.status(404).send({ error: 'You cannot follow yourself' });
    }
  }

  static async unfollow(req, res) {
    if (req.params.id !== req.userId) {
      const userToUnfollow = await User.findByIdAndUpdate(
        req.params.id,
        ignore,
        {
          $pull: { followers: req.userId },
        }
      );
      if (!userToUnfollow) {
        return res.status(400).send({ err: 'User not found' });
      }
      const userId = req.userId;
      const user = await User.findByIdAndUpdate(
        userId,
        ignore,
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );
      res.status(200).send({ user, userToUnfollow });
    } else {
      res.status(404).send({ error: 'You cannot follow yourself' });
    }
  }

  static resetPassword(req, res) {}
}

export default UsersController;
