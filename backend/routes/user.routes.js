const rateLimit = require('../middleware/rateLimit')
const router = require('express').Router();
const { use } = require('../app');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller')

const password = require('../middleware/password')
const multer = require('../middleware/multer.config');


// auth
router.post("/register", password, authController.signUp);
router.post('/login',rateLimit.apiLimiter, authController.signIn);
router.get('/logout', authController.logout);


router.get('/', userController.getAllUsers);

router.get('/:id', userController.userInfo);

router.put('/:id', multer, userController.updateUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;