const router = require("express").Router();

const {
  getAllThot,
  getThotById,
  createThot,
  updateThot,
  deleteThot,
  addReaction,
  deleteReaction,
} = require("../../controllers/thot-control");

router.route("/thots").get(getAllThot).post(createThot);

router
  .route("/thots/:id")
  .get(getThotById)
  .put(updateThot)
  .delete(deleteThot);

router.route("/thots/:thotId/reactions").post(addReaction);

router
  .route("/thots/:thotId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
