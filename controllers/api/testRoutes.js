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
router.get('/content', async (req, res) => {
    try {
        const contentsData = await Content.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              }
            ]
          });
        res.status(200).json(contentsData);

    } catch (err) {
        console.log(err);
    }
});

router.get('/user/:id', async (req, res) => {
    
})

module.exports = router;