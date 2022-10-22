const express = require("express");
const { Station } = require("../models/station");
const { Reservation } = require("../models/reservation");

const router = express.Router();

// Get stations stats
router.get("/stats/stations", isAuthenticated, async (req, res) => {
    // #swagger.tags = ['stats']
    let stats = {
        total: 0,
        pending: 0,
        active: 0
    }
    stats.total = await Station.count()
    stats.active = await Station.count({status: "active"})
    stats.pending = await Station.count({status: "pending"})
    res.send(stats)
})

// Get reservations stats
router.get("/stats/reservations", async (req, res) => {
    // #swagger.tags = ['stats']
    let stats = {
        total: 0,
        pending: 0,
        closed: 0
    }
    stats.total = await Reservation.count()
    stats.closed = await Reservation.count({status: "done"})
    stats.pending = await Reservation.count({status: "ongoing"})
    res.send(stats)
})


module.exports = router