const { Router } = require('express');
const router = Router();
const usersRoutes = require('./users')
const moviesRoutes = require('./movies')
const reviewsRoutes = require('./reviews');

router.get('/', (req,res)=>{
    res.status(200).json({
        message : "Hi, good people! Welcome to Home Page of Movie Review Apps! Have a good day!"
    })
});
router.use('/movie', moviesRoutes)
router.use('/users', usersRoutes)
router.use('/review', reviewsRoutes)

module.exports = router;


