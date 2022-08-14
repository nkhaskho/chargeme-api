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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    },
    volt: {
        type: Number,
        required: true
    },
    location: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Station',
        required:true
    }

})
const Chargepoint=mongoose.model('Chargepoint',chargepointSchema)
//validaion
const validate = (chargepoint) => {
    const schema = Joi.object({
        type: Joi.string().required(),
        price: Joi.string().required(),
        volt: Joi.number().required(),
        location: Joi.objectId().required()

    });
    return schema.validate(chargepoint);
};


module.exports = {Chargepoint, validate}