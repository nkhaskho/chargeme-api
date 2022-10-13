const { Station, validate } = require("../models/station");
const { isAuthenticated } = require("../middlewares/auth");
const express = require("express");

const router = express.Router();

// Get all stations
router.get("/stations", async (req, res) => {
    // #swagger.tags = ['stations']
    let query = {}
    if (req.query.status) query.status = req.query.status;
    if (req.query.owner) query.owner = req.query.owner
    const stations = await Station.find(query)
    res.send(stations)
})

// Add new station
router.post("/stations", isAuthenticated , async (req, res) => {
    // #swagger.tags = ['stations']
    try {
        const station = new Station(req.body)
        const err = await station.validate();
        if (err) res.status(400).send({error: error.errors}); //[0].message
        station.owner = req.user.id;
        await station.save()
        res.send(station)
    } catch (error) {
        res.status(400).send({error: error});
    }
})

// Get station by id
router.get("/stations/:id", (req, res) => {
    // #swagger.tags = ['stations']
    Station.findById(req.params.id, (err, station) => {
        if (err) res.status(404).send({error: `Station with id "${req.params.id} not found!"`})
        res.send(station)
    })
    //.populate('owner')
})


// Update station by id
router.put("/stations/:id", (req, res) => {
    // #swagger.tags = ['stations']
    Station.findByIdAndUpdate(req.params.id, req.body, (err, station) => {
        if (err) {
            res.status(404).send({error: "Station not found"});
        } else {
            //user.password = "";
            res.send(station);
        }
    })
})


// Delete station by id
router.delete("/stations/:id", (req, res) => {
    // #swagger.tags = ['stations']
    Station.findByIdAndDelete(req.params.id, (err, station) => {
        if (err) { res.status(404) }
        else res.status(204).send(station)
    })
})



module.exports = router