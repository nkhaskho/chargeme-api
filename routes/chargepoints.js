const { Chargepoint, validate } = require("../models/chargepoint");
const express = require("express");

const router = express.Router();

// Get all chargepoints
router.get("/chargepoints", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    const chargepoints = await Chargepoint.find()
    res.send (chargepoints)
})

// Add new chargepoint
router.post("/chargepoints", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    const { err } = validate(req.body)
    if (err) res.send({error: error.errors}); //[0].message
    const chargepoint = new Chargepoint(req.body)
    await chargepoint.save()
    res.send(chargepoint)
})

// Get chargepoint by id
router.get("/chargepoints/:id", (req, res) => {
    // #swagger.tags = ['chargepoints']
    Chargepoint.findById(req.params.id, (err, chargepoint) => {
        if (err) res.status(404).send({error: `Chargepoint with id "${req.params.id} not found!"`})
        else res.send(chargepoint);
    })
})

// Delete existing chargepoint
router.delete("/chargepoints/:id", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    // #swagger.description = 'Delete chargepoint by id.'
    Chargepoint.findByIdAndDelete({ _id: req.params.id }, (err, chargepoint) => {
        if (err) {
            res.status(404).send({error: "chargepoint not found"})
        } else {
            res.status(202).send("chargepoint deleted.")
        }
    });
})

// Update chargepoint by id
// a voir
router.put("chargepoints/:id", (req, res) => {
    // #swagger.tags = ['chargepoints']
    Chargepoint.findByIdAndUpdate(req.params.id, req.body, (err, chargepoint) => {
        if (err) {
            res.status(404).send({error: "chargepoint not found"});
            console.log(err);
        } else {
            res.send(chargepoint);
        }
    })
})


module.exports = router