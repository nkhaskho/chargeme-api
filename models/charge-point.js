// required imports
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// create schema
const chargepointSchema = mongoose.Schema({

    type: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    volt: {
        type: Number,
        required: true
    },

    station: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Station',
        required: true
    },

    lng : { 
        type: Number, 
        required: true 
    },

    lat : { 
        type: Number, 
        required: true 
    }

})
const ChargePoint = mongoose.model('ChargePoint', chargepointSchema)

//validaion
const validate = (chargePoint) => {
    const schema = Joi.object({
        type: Joi.string().required(),
        price: Joi.string().required(),
        volt: Joi.number().required(),
        station: Joi.objectId().required(),
        lng: Joi.number().required(),
        lat: Joi.number().required()
    });
    return schema.validate(chargePoint);
};


module.exports = {ChargePoint, validate}