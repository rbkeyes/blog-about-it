const router = require('express').Router();
const { User, Content, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/comments/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            logged_in: req.session.logged_in,
            where:{
                content_id: req.params.id,
            },
        });
        res.status(200).json(commentData);
        console.log(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/comments/:id', async (req, res) => {
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