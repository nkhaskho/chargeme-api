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
        ref: 'User', 
        required: true
    },

    chargePoint:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChargePoint', 
        required: true
    }

})


const Reservation = mongoose.model('Reservation', ReservationSchema)


//validaion
const validate = (reservation) => {
    const schema = Joi.object({
        device: Joi.string().required(),
        duration: Joi.number().required(),
        date: Joi.date().required(),
        client: Joi.objectId().allow(null),
        chargePoint: Joi.objectId().required()
    });
    return schema.validate(reservation);
};


module.exports = { Reservation, validate }