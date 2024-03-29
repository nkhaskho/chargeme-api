const { Reservation } = require("../models/reservation");
const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Get all reservations
router.get("/reservations", async (req, res) => {
    // #swagger.tags = ['reservations']
    let filters = {}
    if (req.query.client) filters.client = req.query.client
    if (req.query.status) filters.status = req.query.status 
    const reservations = await Reservation.find(filters)
    res.send (reservations)
})

// Add new reservation
router.post("/reservations", isAuthenticated, async (req, res) => {
    // #swagger.tags = ['reservations']
    try {
        const reservation = new Reservation(req.body)
        const err = await  reservation.validate()
        if (err) res.status(400).send({error: error.errors}); //[0].message
        // test if chargepoint already reserved for that date-time
        let startDateTime = new Date(reservation.date)
        startDateTime.setMinutes(startDateTime.getMinutes()-30)
        let endDateTime = new Date(reservation.date)
        endDateTime.setMinutes(endDateTime.getMinutes()+reservation.duration)
        const reservations = await Reservation.find({
            chargePoint: req.body.chargePoint,
            date: { $gte: startDateTime, $lte: endDateTime }
        })
        // if chargepoint already reserved
        if (reservations.length>0) {
            res.status(400).send({
                error: "ChargePoint already reserved for that date-time"
            });
        } else {
            reservation.client = req.user.id
            await reservation.save()
            res.send(reservation)
        }
        
    } catch (error) {
        res.status(400).send({error: error});
    }
})

// Get reservation by id
router.get("/reservations/:id", (req, res) => {
    // #swagger.tags = ['reservations']
    Reservation.findById(req.params.id, (err, reservation) => {
        if (err) res.status(404).send({error: `reservation with id "${req.params.id} not found!"`})
        else res.send(reservation);
    })
})

// Delete existing reservation
router.delete("/reservations/:id", async (req, res) => {
    // #swagger.tags = ['reservations']
    // #swagger.description = 'Delete reservation by id.'
    Reservation.findByIdAndDelete({ _id: req.params.id }, (err, reservation) => {
        if (err) {
            res.status(404).send({error: "reservation not found"})
        } else {
            res.status(202).send("reservation deleted.")
        }
    });
})

// Update reservation by id
// a voir
router.put("/reservations/:id", (req, res) => {
    // #swagger.tags = ['reservations']
    Reservation.findByIdAndUpdate(req.params.id, req.body, (err, reservation) => {
        if (err) {
            res.status(404).send({error: "reservation not found"});
            console.log(err);
        } else {
            res.send(reservation);
        }
    })
})


module.exports = router