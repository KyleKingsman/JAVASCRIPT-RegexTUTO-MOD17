const router = require("express").Router();
const apiUsers = require("./api/user-routes");
const apiThots = require("./api/thot-routes");





router.use("/api", apiUsers);
router.use("/api", apiThots);
router.use((req, res) => {
  res.status(404).send("<h1> 404 Error (x _ x) </h1>");
});

module.exports = router;