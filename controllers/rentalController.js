const express = require("express");
const router = express.Router();
const rentals = require("../models/rental-db")

router.get("/list", (req, res) => {
    res.render("rentals/list", {
        rentals: rentals.getRentalsByCityAndProvince(),
    });
});


module.exports = router;