//Ran this file just once to create a new field in the database { coordinate: [longitude,latitude] }

const mongoose = require('mongoose')
const locationDetails = require('./../models/locationDetails')

(async function(){
    try{

        const docs = await locationDetails.find()
    
    console.log(docs.length, "docs", docs[0])

    const updated = []

    docs.forEach(async obj => {
        const data = await locationDetails.updateOne({ _id: obj._id }, { $set: { coordinates:  [ obj.longitude, obj.latitude ] } }, { strict: false, new: true } )
    
        updated.push(data)
    })

    console.log(updated.length,"updated",updated[0])

    }catch(err){
        console.log(err)
    }


})()