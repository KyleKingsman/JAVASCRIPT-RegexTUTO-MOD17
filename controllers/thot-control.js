const { user, Thought } = require("../models");

const thotController = {
  getAllThot(req, res) {
    Thot.find({})
      .populate({
        path: "reactions", 
        select: "-__v", 
      })
      .select("-__v") 
      .then((dbThotData) => res.json(dbThotData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getThotById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThotData) => {
        if (!dbThotData) {
          res.status(404).json({ message: "No Thoughts found with that id!" });
          return;
        }
        res.json(dbThotData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThot({ body }, res) {
    Thot.create(body)
      .then((_id) => {
        return user.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User Found! (／ロ°)／" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  updateThot({ params, body }, res) {
    Thot.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((dbThotData) => {
        if (!dbThotData) {
          res.status(404).json({ message: "No Thought found with that id!" });
          return;
        }
        res.json(dbThotData);
      })
      .catch((err) => res.status(400).json(err));
  },
//   terminate the thots ʕ •ᴥ•ʔ
  deleteThot({ params }, res) {
    Thot.findOneAndDelete({ _id: params.id })
      .then((dbThotData) => {
        if (!dbThotData) {
          res.status(404).json({ message: "No Thought found with that id!" });
          return;
        }
        res.json(dbThotData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //***------ Thot/Reaction----------------------
  addReaction({ params, body }, res) {
    Thot.findOneAndUpdate(
      { _id: params.thotId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThotData) => {
        if (!dbThotData) {
          res.status(404).json({ message: "No Thought found with that id!" });
          return;
        }
        res.json(dbThotData);
      })
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thot.findOneAndUpdate(
      { _id: params.thotId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThotData) => {
        res.json(dbThotData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thotController;
