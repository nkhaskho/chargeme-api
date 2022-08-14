// required imports
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// create schema
const stationSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    
    owner : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true 
    }

    // TODO: address (longitude, latitude)

})

const Station = mongoose.model('Station', stationSchema)

const validate = (station) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        status: Joi.string().required(),
        owner: Joi.objectId().required()
    });
    return schema.validate(station);
};

module.exports = {Station, validate}