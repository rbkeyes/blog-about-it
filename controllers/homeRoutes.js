const router = require('express').Router();
const { User, Content } = require('../models');
const withAuth = require('../utils/auth');

// 🏡 home route
router.get('/', async (req, res) => {
    try {

// get content from database, incuding user name that matches user_id
const contentsData = await Content.findAll({
  include: [
    {
      model: User,
      attributes: ['username'],
    }
  ]
});
console.log(contentsData);
// 404 status if no contentsData
if (!contentsData) {
  res.status(404).json('No contents to display');
};

// map results to display on page
const blogs = contentsData.map((blog) => blog.get({plain: true}));
console.log(blogs);

      // Pass serialized data and session flag into template
      res.render('homepage', { 
        blogs,
        id: req.session.id,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', async (req, res) => {
    try {
        res.render('login-signup', {
            signup: false,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
  });

  router.get('/signup', async (req, res) => {
    try {
        res.render('login-signup', {
            signup: true,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
  });
  


  module.exports = router;