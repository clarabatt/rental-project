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

router.post("/login", (req, res) => {

    console.log(req.body);

    const { email, password } = req.body;

    var responseObj = {
        validationMsg: "",
        values: req.body
    };

    isValidationOk = true;

    if (typeof password !== "string" || password.trim().length === 0){
        responseObj.validationMsg.password = "Please enter a password";
        isValidationOk = false;
    }
    
    if (!typeof email !== "string" || email.trim().length === 0){
        responseObj.validationMsg.password = "Please enter an email";
        isValidationOk = false;
    }

    if (isValidationOk) {
        res.render("general/welcome");
    } else {
        res.render("general/login", responseObj);
    }

});


module.exports = router;