const express = require("express");
const router = express.Router();
const rentals = require("../models/rental-db")

router.get("/", (req, res) => {
    res.render("rentals/rentals", {
        rentals: rentals.getRentalsByCityAndProvince(),
    });
});

router.get("/list", (req, res) => {
    if (!req.session.user || !req.session.isCustomer) {
        res.render("rentals/list");
    } else {
        // res.status(401).send("You are not authorized to view this page.");
        res.status(401).render("general/401");
    }
});


module.exports = router;