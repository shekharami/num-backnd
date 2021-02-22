const mongoose = require('mongoose')
const locationDetails = require('./../models/locationDetails')

const getTimestamp = (date) => {
    
    date = date.split(' ')

    let time = new Date(`${date[0]} ${date[1]} ${date[2]}`).getTime()

    const hnm = date[3].split(':')
    
    const [h,m] = [...hnm]

    time += h*60*60*1000 + m*60*1000

    time -= (5*60*60*1000 + 30*60*1000)
    
    return time
}

const parseTime = (query) => {

    let start_tis, end_tis

    if(isNaN(query.start_tis*1) && isNaN(query.end_tis*1) ){
        start_tis = getTimestamp(query.start_tis)
        end_tis = getTimestamp(query.end_tis)
    }else{
        start_tis = query.start_tis*1
        end_tis = query.end_tis*1
    }

    return {start_tis, end_tis}

}

exports.placeInteraction = async (req, res, next) => {

    try{

        const { start_tis, end_tis } = parseTime(req.query)
        console.log(new Date(start_tis).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))
        console.log(new Date(end_tis).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))


        const coordinates = req.body.polygon.split(',').map(e => {
            e = e.split(' ')
            e[0] *= 1
            e[1] *= 1 
            return e
        })

        const docs = await locationDetails.find(
            {
            coordinates : {
                $geoWithin: { $polygon: coordinates }
            },
            time : { 
                $gte: new Date(start_tis), 
                $lte: new Date(end_tis) 
                }
            }
        ) 

        res.status(200).json({
            status: "success",
            data: {
                length: docs.length,
                data: docs
            }
        })
    }catch(err){
        res.status(500).json({
            status: "fail",
            error: err.stack
        })
    }
    

    next()

}

exports.getVehicleActivity = async (req, res, next) => {

    try{
        const { start_tis, end_tis  } = parseTime(req.query)
        const license = req.query.license
        
        const doc = await locationDetails.aggregate([
                                                                    
            { $match : 
                { 
                    "vehicle_license": 
                                {
                                    "$eq": license
                                },
                    "time" :
                                {
                                    "$gte": new Date(start_tis), 
                                    "$lte": new Date(end_tis) 
                                }
                } 
            } 

        ])

        const locations = doc.map(obj => {
                return [obj.longitude, obj.latitude]
            })


        res.status(200).json({
            status: "success",
            license,
            data: {
                length: doc.length,
                data: locations
            }
        })

    }catch(err){
        res.status(500).json({
            status: "fail",
            error: err.stack
        })
    }
    

    next()
}

