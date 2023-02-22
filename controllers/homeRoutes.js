const router = require('express').Router();
// const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
    //   const projectData = await Project.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['name'],
    //       },
    //     ],
    //   });
  
    //   // Serialize data so the template can read it
    //   const projects = projectData.map((project) => project.get({ plain: true }));
  
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
        res.render('login', {
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
  });

  module.exports = router;