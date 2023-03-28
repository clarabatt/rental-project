const express = require("express");
const router = express.Router();
const rentals = require("../models/rental-db");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);

router.get("/", (req, res) => {
    res.render("general/home", {
        rentals: rentals.getFeaturedRentals()
    });
});

router.get("/log-in", (req, res) => {
    res.render("general/log-in");
});

router.get("/cart", (req, res) => {
    res.render("general/cart");
});

router.get("/sign-up", (req, res) => {
    res.render("general/sign-up");
});

router.post("/sign-up", async (req, res) =>{

    const { firstname, lastname, email, password, passwordConfirm} = req.body;

    var responseObj = {
        validationMsg: {},
        values: req.body
    };

    isValidationOk = true;

    if (typeof password !== "string" || password.trim().length === 0){
        responseObj.validationMsg.password = "Please enter a password";
        isValidationOk = false;
    } else if (!(password.trim().length >= 8 && password.trim().length <= 12)) {
        responseObj.validationMsg.password = "A password size must be between 8 to 12 characters";
            isValidationOk = false;
    }
    else if (!(/\W+/gm.test(password) && /[a-z]+/gm.test(password) && /[A-Z]+/gm.test(password) && /[0-9]+/gm.test(password))) {
            responseObj.validationMsg.password = "A password must contains at least one lowercase letter, uppercase letter, number and a symbol.";
            isValidationOk = false;
    }

    if(typeof passwordConfirm !== "string" || passwordConfirm.trim().length === 0) {
        responseObj.validationMsg.passwordConfirm = "Please, type again the password";
            isValidationOk = false;
    } else if (passwordConfirm != password) {
        responseObj.validationMsg.passwordConfirm = "The passwords don't match";
        isValidationOk = false;
    }
    
    if (typeof email !== "string" || email.trim().length === 0){
        responseObj.validationMsg.email = "Please enter an email";
        isValidationOk = false;
    } else {
        
        await userModel.findOne({email: email}).then( data => {
            if (data) {
                isEmailInUse = true;
            } else {
                isEmailInUse = false;
            }
        });

        if (!/(\w+)@([a-z]+)\.[a-z]{2,4}/.test(email)) {
                responseObj.validationMsg.email = "The email is not valid";
                isValidationOk = false;
        } else if (isEmailInUse) {
            responseObj.validationMsg.email = "This emails is already in use";
            isValidationOk = false;
        }

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

        const newUser = new userModel({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: bcrypt.hashSync(password, salt)
        });

        newUser.save()
        .then(() => {
            const sendGrid = require("@sendgrid/mail");
            sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
    
            const msg = {
                to: email,
                from: "clarabattesini@gmail.com",
                subject: "Clara from Rent Temp: Welcome!",
                html:
                    `Hi ${firstname} ${lastname}!<br><br>
                    We saw that you are interested on book a house rent. <br>
                    That's the right place, we can help you with that task!<br>
                    Look our website to know more about us and to see new offers.<br><br>
  
                    Sincerely, <br>
                    Clara<br>
                    Customer Success Analyst <br>
                    `
            };
    
            sendGrid.send(msg)
                .then(() => {
                  res.render("general/welcome");
                })
                .catch(err => {
                    console.log(err);
    
                    res.render("general/sign-up", {
                      validationMsg,
                      values: req.body
                    });
                });
        }).catch(err => {
            if (err) {
                res.render("general/sign-up", responseObj);
            }
        });
    } else {
        res.render("general/sign-up", responseObj);
    }
});

router.post("/log-in", async (req, res) => {

    const { email, password, type } = req.body;

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
    } else {
        await userModel.findOne({email: email}).then( user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                isValidationOk = true;
                req.session.user = user;
                req.session.isCustomer = type === "customer";
            } else {
                responseObj.validationMsg.email = "Sorry, you entered an invalid email and/or password";
                isValidationOk = false;
            }
        });
    }

    if (isValidationOk) {
        if (type === "clerk") {
            res.render("rentals/list");
        } else {
            res.render("general/cart");
        }
    } else {
        res.render("general/log-in", responseObj);
    }

});


module.exports = router;