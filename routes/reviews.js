const { Review, validate } = require("../models/review");
const express = require("express");

const router = express.Router();

// Get all reviews
router.get("/reviews", async (req, res) => {
    // #swagger.tags = ['reviews']
    const reviews = await Review.find()
    res.send(reviews)
})

// Add new review
router.post("/reviews", async (req, res) => {
    // #swagger.tags = ['reviews']
    const { err } = validate(req.body)
    if (err) res.send({error: error.errors}); //[0].message
    const review = new Review(req.body)
    await review.save()
    res.send(review)
})

// Get review by id
router.get("/reviews/:id", (req, res) => {
    // #swagger.tags = ['reviews']
    Review.findById(req.params.id, (err, review) => {
        if (err) res.status(404).send({error: `Review with id "${req.params.id} not found!"`})
        else res.send(review);
    })
})

// Delete existing review
router.delete("/reviews/:id", async (req, res) => {
    // #swagger.tags = ['reviews']
    // #swagger.description = 'Delete review by id.'
    Review.findByIdAndDelete({ _id: req.params.id }, (err, review) => {
        if (err) {
            res.status(404).send({error: "review not found"})
        } else {
            res.status(202).send("review deleted.")
        }
    });
})

// Updatereview by id
router.put("/reviews/:id", (req, res) => {
    // #swagger.tags = ['reviews']
    Review.findByIdAndUpdate(req.params.id, req.body, (err,review) => {
        if (err) res.status(404).send({error: `Review with id "${req.params.id} not found!"`})
        else res.send(review);    
    })
})

module.exports = router