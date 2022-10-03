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
    const { err } = validate(req.body);
    console.log(req.user);
    if (err) res.send({error: error.details[0].message}); //[0].message
    const station = new Station(req.body)
    station.owner = req.user.id;
    await station.save()
    res.send(station)
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