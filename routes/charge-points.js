const { ChargePoint, validate } = require("../models/charge-point");
const express = require("express");

const router = express.Router();

// Get all chargepoints
router.get("/chargepoints", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    let filterOptions = {}
    if (req.query.station) filterOptions.station = req.query.station
    if (req.query.category) filterOptions.category = req.query.category
    if (req.query.search) query.type = { $regex: req.query.search, $options: "i" }
    await ChargePoint.find(filterOptions).exec()
    .then(chargePoints => res.status(200).send(chargePoints))
    .catch(error => res.status(400).send(error))
})

// Add new chargepoint
router.post("/chargepoints", async (req, res) => {
    // #swagger.tags = ['chargepoints']
    try {
        const chargePoint = new ChargePoint(req.body)
        let error = await chargePoint.validate();
        if (error) { res.status(400).send({error: error.errors}); } //[0].message
        await chargePoint.save()
        res.send(chargePoint)
    } catch (error) {
        res.status(400).send({error: error});
    }
    
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