// required imports
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// create schema
const chargepointSchema = mongoose.Schema({

    category: {
        type: String,
        enum: ['mobile', 'car', 'laptop'],
        required: [true, 'category is required']
    },
    
    type: {
        type: String,
        required: [true, 'type is required']
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: [true, 'price is required']
    },

    volt: {
        type: Number,
        required: [true, 'type is required']
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


module.exports = { ChargePoint }