const router = require('express').Router();
const { User, Article, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        res.render("dashboard", {
            logged_in: req.session.logged_in
        });
        // const userData = User.findByPk();
        // res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/write', withAuth, async (req, res) => {
    try {
        res.render('write', {
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/publish', withAuth, async (req,res) => {
    try {
        let newBlog = await Article.create({

        })
    } catch (err) {
        res.status(400).json(err);
    };
});




module.exports = router;