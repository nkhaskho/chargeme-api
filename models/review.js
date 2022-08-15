// required imports
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// create schema
const reviewSchema = mongoose.Schema({


    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    note: {
        type: Number,min:0,max:5,
        required: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station', 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }

})
const Review=mongoose.model('Review',reviewSchema)

const validate = (review) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        note: Joi.number().required(),
        user: Joi.objectId().required(),
        station: Joi.objectId().required()

    });
    return schema.validate(review);
};


module.exports = {Review, validate}