const { Router } = require('express');
const router = Router();
const {GenreController} = require('../controllers/genre')
const {MovieController} = require('../controllers/movies');
const {ReviewController} = require('../controllers/reviews');
const { authentication, authorization } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer')

router.get('/genre', GenreController.getGenre) 
router.post('/genre/add',authentication,authorization, GenreController.addGenre)
router.delete('/genre/delete/:id',authentication, authorization,GenreController.deleteGenre)
router.get('/genre/find/:id',authentication, GenreController.findGenre)
router.get('/:page', MovieController.getMovie)
router.post('/add',authentication, authorization, upload.single('picture'), MovieController.addMovie)
router.post('/find/title', MovieController.search)
router.get('/find/:id',authentication, MovieController.findById)
router.put('/update/:id', authentication, authorization, upload.single('picture'),MovieController.updateMovie)
router.delete('/delete/:id', authentication, authorization, MovieController.deleteMovie)


module.exports = router;


