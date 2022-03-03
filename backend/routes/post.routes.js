const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middleware/multer.config');
const { checkUser, requireAuth } = require('../middleware/auth.middleware');

router.get('/',  postController.readPost);
router.post('/', multer, postController.createPost);
router.put('/:id', multer, postController.updatePost);
router.delete('/:id',multer, postController.deletePost);


module.exports = router;
