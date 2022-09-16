const { Reservation, validate } = require("../models/reservation");
const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Get all reservations
router.get("/reservations", async (req, res) => {
    // #swagger.tags = ['reservations']
    const reservations = await Reservation.find()
    res.send (reservations)
})

// Add new reservation
router.post("/reservations", isAuthenticated, async (req, res) => {
    // #swagger.tags = ['reservations']
    const { err } = validate(req.body)
    if (err) res.send({error: error.errors}); //[0].message
    const reservation = new Reservation(req.body)
    reservation.client = req.user._id
    await reservation.save()
    res.send(reservation)
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