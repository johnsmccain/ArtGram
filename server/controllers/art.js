import crypto from 'crypto';
import Art from '../models/art';
import User from '../models/user';
import redisClient from '../utils/redis';

class ArtController {
  static async postArt(req, res) {
    console.log(req.userId);
    const { name, image, desc } = req.body;
    if (!name || !image || !desc) {
      res.status(400).send({ error: 'Please submit all required fields' });
      return;
    }

    const art = await Art.create({
      name,
      image,
      postedBy: req.userId,
      desc: desc || '',
    });

    art.save();
    res.status(201).json(art);
    //{ message: 'Art posted successfully' });
  }

  static async artsByUser(req, res) {
    const allArts = await Art.find({ postedBy: req.userId });
    res.status(200).send(allArts);
  }

  static async deleteArt(req, res) {
    const art_id = req.params.id;
    const art = await Art.deleteOne({ _id: art_id, postedBy: req.userId });
    console.log(art);
    if (art) {
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(401).json({ error: 'Does not exist' });
    }
  }

  static async like(req, res) {
    const art_id = req.params.id;
    const art = await Art.findByIdAndUpdate(
      art_id,
      {
        $addToSet: { likes: req.userId },
      },
      { new: true }
    );
    console.log(art);
    res.status(200).send(art);
  }

  static async unlike(req, res) {
    const art_id = req.params.id;
    const art = await Art.findByIdAndUpdate(
      art_id,
      {
        $pull: { likes: req.userId },
      },
      { new: true }
    );
    console.log(art);
    res.status(200).send(art);
  }
}

export default ArtController;
