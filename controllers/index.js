const router = require('express').Router();
const thoughtRoutes = require('./thoughtController');
const userRoutes = require('./userController');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;