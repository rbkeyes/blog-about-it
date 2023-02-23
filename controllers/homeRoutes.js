const router = require('express').Router();
// const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
// add code to get all blog posts and render to page
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
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

  router.get('/dashboard', withAuth, async (req, res) => {

  })

  module.exports = router;