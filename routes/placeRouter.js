const express = require('express')
const placeController = require('./../controllers/placeController')

const router = express.Router()

//for both the routes, please provide the time either in epoc timestamps or {09 Sept 2018 09:00 IST} this format

//this is a POST request to get the polygon coordinates from body. 
// Returns the list of vehicles that are withing given polygon between the time range  
router.post('/place_interactions', placeController.placeInteraction)

router.get('/vehicle_activity', placeController.getVehicleActivity)

module.exports = router