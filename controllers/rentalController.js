const express = require("express");
const router = express.Router();
const rentals = require("../models/rental-db")

router.get("/", (req, res) => {
    res.render("rentals/rentals", {
        rentals: rentals.getRentalsByCityAndProvince(),
    });
});


module.exports = router;