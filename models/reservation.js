// required imports
const mongoose = require('mongoose')
const Joi = require('joi')
//ligne ??
const { string, required } = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// create schema
const reservationSchema = mongoose.Schema({


    dateres: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    chargepoint:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chargepoint', 
        required: true
    }

})
const Reservation=mongoose.model('Reservation',reservationSchema)
//validaion
const validate = (reservation) => {
    const schema = Joi.object({
        device: Joi.string().required(),
        duration: Joi.number().required(),
        dateres: Joi.date().required(),
        user: Joi.objectId().required(),
        chargepoint: Joi.objectId().required()

    });
    return schema.validate(reservation);
};


module.exports = {Reservation, validate}