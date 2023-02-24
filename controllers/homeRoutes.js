const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
// get Content
// const contentsData = await Content.findAll();

// if (!contentsData) {
//   res.status(404).json('No contents to display');
// };

// const blogs = contentsData.map((blog) => blog.get({plain: true}));
// console.log(blogs);

      // Pass serialized data and session flag into template
      res.render('homepage', { 
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