const router = require('express').Router();
const userRoutes = require('./user-routes');
const thotRoutes = require('./thot-routes');


router.use('/users', userRoutes);
router.use('/thoughts', thotRoutes);
module.exports = router;