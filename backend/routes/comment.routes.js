
const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

// Comments CRUD
router.get("/", commentController.readComment);
router.post("/", commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;