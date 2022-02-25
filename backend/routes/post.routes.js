const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middleware/multer.config');


router.get('/', postController.readPost);
router.post('/', multer, postController.createPost);
router.put('/:id', multer, postController.updatePost);
router.delete('/:id', postController.deletePost);


module.exports = router;
