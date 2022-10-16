// required imports
const mongoose = require('mongoose')
const Joi = require('joi')
//ligne ??
const { string, required } = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// create schema
const ReservationSchema = mongoose.Schema({

    date: {
        //date doit etre > createdat
        type: Date ,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: String,
        enum: ['ongoing', 'done', 'canceled'],
        default: 'ongoing'  
    },

    device: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    chargePoint:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChargePoint'
    }

})


const Reservation = mongoose.model('Reservation', ReservationSchema)


module.exports = { Reservation }