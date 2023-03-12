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

router.post("/signup", (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    var responseObj = {
        validationMsg: {},
        values: req.body
    };

    isValidationOk = true;

    if (typeof password !== "string" || password.trim().length === 0){
        responseObj.validationMsg.password = "Please enter a password";
        isValidationOk = false;
    } 
    if (!(password.trim().length >= 8 && password.trim().length <= 12 && /[a-z]+[A-Z]+[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\/]+[0-9]+/gm.test(password))) {
        responseObj.validationMsg.password = "A password must attend those criteria: Size is between 8 to 12 characters and contains at least one lowercase letter, uppercase letter, number and a symbol.";
        isValidationOk = false;
    }

    
    if (typeof email !== "string" || email.trim().length === 0){
        responseObj.validationMsg.email = "Please enter an email";
        isValidationOk = false;
    } 

    if (!/(\w+)@([a-z]+)\.[a-z]{2,4}/.test(email)) {
        responseObj.validationMsg.email = "The email is not valid";
        isValidationOk = false;
    }

    if (typeof firstname !== "string" || firstname.trim().length === 0){
        responseObj.validationMsg.firstname = "Please enter a firstname";
        isValidationOk = false;
    }

    if (typeof lastname !== "string" || lastname.trim().length === 0){
        responseObj.validationMsg.lastname = "Please enter a lastname";
        isValidationOk = false;
    }

    if (isValidationOk) {
        
        // SEND EMAIL

    } else {
        res.render("general/signup", responseObj);
    }
});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    var responseObj = {
        validationMsg: {},
        values: req.body
    };

    isValidationOk = true;

    if (typeof password !== "string" || password.trim().length === 0){
        responseObj.validationMsg.password = "Please enter a password";
        isValidationOk = false;
    }
    
    if (typeof email !== "string" || email.trim().length === 0){
        responseObj.validationMsg.email = "Please enter an email";
        isValidationOk = false;
    }

    if (isValidationOk) {
        res.render("general/welcome");
    } else {
        res.render("general/login", responseObj);
    }

});


module.exports = router;