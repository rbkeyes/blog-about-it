const router = require('express').Router();
const { User, Content, Comment } = require('../../models');

// 🦄 added to check that users were added properly 🦄
router.get('/users', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 🦄 test route to be able to check if post /publish is working 🦄
router.get('/content/:id', async (req, res) => {
    try {
        const contentsData = await Content.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: Comment,
                attributes: ['input', 'user_id']
              }
            ],
            where: {
                id: req.params.id
            }
          });
        res.status(200).json(contentsData);

    } catch (err) {
        console.log(err);
    }
});

router.get('/comment/:id', async (req, res) => {
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
                      attributes: ['input'], 
                    },
                ],
                });
        res.status(200).json(contentsData);
        console.log(contentsData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/update/:id', async (req, res) => {
    try {
        const contentData = await Content.findByPk(req.params.id);
        res.json(contentData);
        console.log(contentData);
    } catch (err) {
        res.status(500).json(contentData);
    }
})

router.post('/comment/:id', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            content_id: req.params.id,
            user_id: req.session.user_id
        });
        console.log(commentData);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/update/:id', async (req, res) => {
    try {
        console.log(req.body);
        const updatedContent = await Content.update(
            {
                ...req.body,
            }, {
            where: {
                id: req.params.id,
            }
        });
        res.json("Post successfully updated");
        console.log(updatedContent);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteContent = await Content.destroy(
           {
            where: {
                id: req.params.id,
            }
        });
        res.json("content deleted");
        // console.log(updatedContent);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;