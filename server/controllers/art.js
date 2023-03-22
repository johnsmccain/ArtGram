import Art from '../models/art';

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

  static async myArts(req, res) {
    const allArts = await Art.find({ postedBy: req.userId });
    res.status(200).send(allArts);
  }

  static async getByCategory(req, res) {
    const allArts = await Art.find({
      category: req.param.category,
    });
    res.status(200).send(allArts);
  }

  static async deleteArt(req, res) {
    const art_id = req.params.id;
    const art = await Art.deleteOne({ _id: art_id, postedBy: req.userId });
    if (art.deletedCount) {
      res.status(204).json({});
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
    res.status(200).send(art);
  }
}

export default ArtController;
