const router = require('express').Router();
const { User, Content, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// user dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        // get content from database, incuding user name that matches user_id
        const contentsData = await Content.findAll({
            attributes: { exclude: "body" },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }],
            where:
            {
                user_id: req.session.user_id
            },
        });

        // 404 status if no contentsData
        if (!contentsData) {
            res.status(404).json('No contents to display');
        };
        const blogs = contentsData.map((blog) => blog.get({ plain: true }));
        console.log(blogs);
        res.render("dashboard", {
            blogs,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        }
        );
    } catch (err) {
        res.status(500).json(err);
    };
});

// write new post
router.get('/write', withAuth, async (req, res) => {
    try {
        res.render('dashboard', {
            write: true,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    };
});

// publish new post
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

// render form to update existing post (req.params.id = content.id)
router.get('/update/:id', withAuth, async (req,res) => {
    try {
        const contentData = await Content.findByPk(req.params.id);
        if (!contentData) {
            res.status(404).json("No content with that id")
        }
        const content = contentData.get({plain:true}); 
        res.render('dashboard', {
            update: true,
            content,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// update post in db (req.params.id = content.id)
router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const contentData = await Content.update(
            {...req.body,
                user_id: req.session.user_id,
                logged_in: req.session.logged_in,
            }, {
            where: {
                id: req.params.id,
            }
        },
        );
        res.status(200).json("update successful")
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// delete post by id (req.params.id = content.id)
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteContent = await Content.destroy(
           {
            where: {
                id: req.params.id,
            }
        });
        res.json("content deleted");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;