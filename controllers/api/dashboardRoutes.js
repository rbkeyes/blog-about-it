const router = require('express').Router();
const { User, Content, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// user dashboard by user.id
router.get('/', withAuth, async (req, res) => {
    console.log(req.params);

    // get content from database, incuding user name that matches user_id
const contentsData = await Content.findAll({
    // where:
    // {
    //     user_id: req.params.user_id
    // },
    include: 
      {
        model: User,
        attributes: ['username'],
      }
    
  });

  // 404 status if no contentsData
  if (!contentsData) {
    res.status(404).json('No contents to display');
  };
    const blogs = contentsData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
    try {
        res.render("dashboard", {
            blogs,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        }
        );
        // const userData = User.findByPk();
        // res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/write/:id', withAuth, async (req, res) => {
    try {
        res.render('write', {
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/publish', withAuth, async (req, res) => {
    try {
        const newContent = await Content.create({
            ...req.body,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
        });
        res.status(200).json(newContent);
        console.log(newContent);
    } catch (err) {
        res.status(400).json(err);
    };
});



module.exports = router;