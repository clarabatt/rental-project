const express = require("express");
const router = express.Router();
const rentals = require("../models/rental-db")

router.get("/", (req, res) => {
    res.render("general/home", {
        rentals: rentals.getFeaturedRentals()
    });
});

router.get("/login", (req, res) => {
    res.render("general/login");
});

router.get("/rentals", (req, res) => {
    res.render("general/rentals", {
        rentals: rentals.getRentalsByCityAndProvince(),
    });
});

router.get("/signup", (req, res) => {
    res.render("general/signup");
});

module.exports = router;