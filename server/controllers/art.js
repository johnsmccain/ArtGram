import Art from '../models/art';
import Comments from '../models/comments';

class ArtController {
  static async postArt(req, res) {
    const { name, image, category, description } = req.body;
    if (!name || !image || !description) {
      res.status(400).send({ error: 'Please submit all required fields' });
      return;
    }
    console.log(`The request is ${req.userId}`);
    const art = await Art.create({
      name,
      image,
      postedBy: req.userId,
      category,
      description: description || '',
    });

    art.save();
    res.status(201).json(art);
    //{ message: 'Art posted successfully' });
  }

  static async getAllArts(req, res) {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const allArts = await Art.find({})
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: 'desc' })
      .populate('postedBy', 'name')
      .populate('comments', 'text');
    res.status(200).send({ arts: allArts });
  }

  static async getArt(req, res) {
    const artId = req.params.id;
    const art = await Art.findOne({ _id: artId });
    if (art) {
      res.status(200).send({ art });
    } else {
      res.status(401).json({ error: 'Does not exist' });
    }
  }

  static async myArts(req, res) {
    const allArts = await Art.find({ postedBy: req.userId });
    res.status(200).send(allArts);
  }

  static async getCategories(req, res) {
    const allArts = await Art.find({});
    const categories = allArts.map((art) => art.category);
    const uniqueCategories = [...new Set(categories)];
    res.status(200).send(uniqueCategories);
  }

  static async getByCategory(req, res) {
    const allArts = await Art.find({
      category: req.param.category,
    });
    res.status(200).send(allArts);
  }

  static async deleteArt(req, res) {
    const artId = req.params.id;
    const art = await Art.deleteOne({ _id: artId, postedBy: req.userId });
    if (art.deletedCount) {
      res.status(204).json({});
    } else {
      res.status(401).json({ error: 'Does not exist' });
    }
  }

  static async comment(req, res) {
    try {
      console.log(req.userId);
      const artId = req.params.id;
      const comment = await Comments.create({
        text: req.body.text,
        userId: req.userId,
        artId,
      });
      console.log(comment);
      const art = await Art.findByIdAndUpdate(
        artId,
        {
          $push: { comments: { text: comment.text, postedBy: req.userId } },
        },
        { new: true }
      );
      res.status(200).send(art);
    } catch (err) {
      console.log(err);
      res.status(404).send({ error: 'failed' });
    }
  }

  static async like(req, res) {
    const artId = req.params.id;
    const art = await Art.findByIdAndUpdate(
      artId,
      {
        $addToSet: { likes: req.userId },
      },
      { new: true }
    );
    res.status(200).send(art);
  }

  static async unlike(req, res) {
    const artId = req.params.id;
    const art = await Art.findByIdAndUpdate(
      artId,
      {
        $pull: { likes: req.userId },
      },
      { new: true }
    );
    res.status(200).send(art);
  }
}

export default ArtController;
