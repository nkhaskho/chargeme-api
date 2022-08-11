




const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = mongoose.Schema({

	fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true,
        lowercase: true
    },

    email: {
        type: String,
        lowercase: true
    },

    role: {
        type: String,
        enum: ['admin', 'provider', 'client'],
        default: 'client'
    },

    joinedAt: {
        type: Date,
        default: Date.now()
    },
    
    password: String,

    phone: {
        type: Number,
        required: [true, 'phone_required']
    }

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
            _id: this._id,
            role: this.role,
            fullName: this.fullName 
        }, 
        process.env.JWT_PRIVATE_KEY
    );
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().allow(''),
        email: Joi.string().email().allow(null).allow(''),
        role: Joi.string().required(),
        phone: Joi.number().required()
    });
    return schema.validate(user);
};

module.exports = { User, validate };