const mongoose = require('mongoose')

const loctaionSchema = mongoose.Schema({

    latitude: Number,

    longitude: Number,

    time: Date,

    vehicle_license: String,

    model: String,

    engine_number: String,

     chassis_number: String,

    coordinates: [Number]
}, { collection : 'locationDetails' },
 {
    toObject: true,
    toJSON: true
})

const locationDetails = mongoose.model('locationDetails', loctaionSchema )

module.exports = locationDetails