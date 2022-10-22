const express = require("express");
const { Station } = require("../models/station");
const { Reservation } = require("../models/reservation");

const router = express.Router();

// Get stations stats
router.get("/stats/stations", async (req, res) => {
    // #swagger.tags = ['stats']
    let stats = {
        pending: 0,
        active: 0,
        inactive: 0
    }
    stats.pending = await Station.count({status: "pending"})
    stats.active = await Station.count({status: "active"})
    stats.inactive = await Station.count({status: "inactive"})
    res.send(stats)
})

// Get reservations stats
router.get("/stats/reservations", async (req, res) => {
    // #swagger.tags = ['stats']
    let stats = {
        ongoing: 0,
        done: 0,
        canceled: 0
    }
    stats.ongoing = await Reservation.count({status: "ongoing"})
    stats.done = await Reservation.count({status: "done"})
    stats.canceled = await Reservation.count({status: "canceled"})
    res.send(stats)
})


module.exports = router