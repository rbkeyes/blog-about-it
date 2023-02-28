const router = require('express').Router();
const { User, Content, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// render content with available comments
// req.params.id = content.id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const contentsData = await Content.findByPk(req.params.id, {
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
                {
                  model: Comment,
                  attributes: ['input', 'date_created'], 
                  include: [{
                    model: User,
                    attributes: ['username'],
                  }],
                },
            ],
            });
        // 404 status if no contentsData
        if (!contentsData) {
            res.status(404).json('No contents to display');
        };
        // blog contents
        const blog = contentsData.get({ plain: true });
        // console.log({blog});
        const comments = contentsData.comments.map((comment) => comment.get({plain:true}));
        // console.log({comments});

        res.render('write-comment', {
            blog,
            comments,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// render comment form
// req.params.id = content.id
router.get('/write/:id', withAuth, async (req, res) => {
    try {
        const contentsData = await Content.findByPk(req.params.id, {
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
                {
                  model: Comment,
                  include: [{
                    model: User,
                    attributes: ['username'],
                  }],
                  attributes: ['input', 'date_created'], 
                },
            ],
            });
        // 404 status if no contentsData
        if (!contentsData) {
            res.status(404).json('No contents to display');
        };
        // blog contents
        const blog = contentsData.get({ plain: true });
        console.log({blog});
        const comments = contentsData.comments.map((comment) => comment.get({plain:true}));
        console.log({comments});

        res.render('write-comment', {
            write: true,
            blog,
            comments,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// req.params.id = content.id
router.post('/:id', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            content_id: req.params.id,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
        console.log(commentData);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;