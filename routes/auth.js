
const express = require("express");
const { User } = require("../models/user");
const Jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");

const router = express.Router();

router.post('/login', (req, res) => {
    // #swagger.tags = ['auth']
    // #swagger.description = 'Get auth token.'
    User.find({username: req.body.username}, async (err, users) => {
        if (err) { res.status(404).send({error: "Invalid username or password"}) } 
        if (users.length>0) {
            let validCredentials = await Bcrypt.compare(req.body.password, users[0].password)
            if (!validCredentials) { res.status(400).json({error: "Invalid username or password"}) }
            else {
                let token = Jwt.sign({
                        id: users[0]._id,
                        role: users[0].role,
                        username: users[0].username
                    }, 
                    process.env.SECRET,
                    { expiresIn: '30d' }
                ); 
                res.status(200).json({
                    token: token, 
                    id: users[0]._id,
                    role: users[0].role
                })
            }
        } else res.status(400).json({error: "Invalid username or password"})
          
    })
})

module.exports = router