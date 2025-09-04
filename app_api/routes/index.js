const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication')

// define routes for our trips endpoint
router 
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripsList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

 // GET Method routes tripsFindByCode - requires parameter
 // PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

// define routes for our auth endpoints
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

module.exports = router;