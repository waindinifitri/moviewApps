const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users');
const { authentication, authorization } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer')

router.get('/list', authentication, authorization, usersController.getAllUsers)
router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.put('/edit/:id', authentication, upload.single('image'), usersController.editUsers)
router.get('/find/:id', authentication, authorization, usersController.findById)

module.exports = router;
