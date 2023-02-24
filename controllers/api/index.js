const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// const commentRoutes = require('./commentRoutes')
const testRoutes = require('./testRoutes')

router.use('/', userRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/comment', commentRoutes);
router.use('/test', testRoutes);

module.exports = router;
