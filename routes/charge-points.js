const { ChargePoint, validate } = require("../models/charge-point");
const express = require("express");

const router = express.Router();

// Get all chargepoints
router.get("/chargepoints", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    let filterOptions = {}
    if (req.params.station) filterOptions['station'] = req.params.station
    if (req.params.category) filterOptions['category'] = req.params.category
    await ChargePoint.find(filterOptions).exec()
    .then(chargePoints => res.status(200).send(chargePoints))
    .catch(error => res.status(400).send(error))
})

// Add new chargepoint
router.post("/chargepoints", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    const { err } = validate(req.body)
    if (err) res.send({error: error.errors}); //[0].message
    const chargePoint = new ChargePoint(req.body)
    await chargePoint.save()
    res.send(chargePoint)
})

// Get chargepoint by id
router.get("/chargepoints/:id", (req, res) => {
    // #swagger.tags = ['chargepoints']
    ChargePoint.findById(req.params.id, (err, chargePoint) => {
        if (err) res.status(404).send({error: `Chargepoint with id "${req.params.id} not found!"`})
        else res.send(chargePoint);
    })
})

// Delete existing chargepoint
router.delete("/chargepoints/:id", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    // #swagger.description = 'Delete chargepoint by id.'
    ChargePoint.findByIdAndDelete({ _id: req.params.id }, (err, chargePoint) => {
        if (err) {
            res.status(404).send({error: "chargepoint not found"})
        } else {
            res.status(202).send("chargepoint deleted.")
        }
    });
})

// Update chargepoint by id
// a voir
router.put("/chargepoints/:id", (req, res) => {
    // #swagger.tags = ['chargepoints']
    ChargePoint.findByIdAndUpdate(req.params.id, req.body, (err, chargePoint) => {
        if (err) {
            res.status(404).send({error: "chargepoint not found"});
            console.log(err);
        } else {
            res.send(chargePoint);
        }
    })
})


module.exports = router