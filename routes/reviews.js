const { Router } = require('express');
const router = Router();
const {ReviewController} = require('../controllers/reviews')

const { authentication } = require('../middlewares/auth')

router.get('/list',ReviewController.getReview)
router.post('/add/:id', authentication, ReviewController.addReview)
router.get('/movie/:movieId', ReviewController.getReviewbyMovie)
router.put('/update/:id',authentication, ReviewController.updateReview)
router.delete('/delete/:id',authentication, ReviewController.deleteReview)



module.exports = router;
