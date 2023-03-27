/*************************************************************************************
* WEB322 - 2231 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Clara Verena Brito Battesini
* Student ID    : 143430213
* Course/Section: WEB322 NCC
*
**************************************************************************************/

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Set up dotenv
dotenv.config({ path: "./keys.env" });

// Set up HandleBars
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

mongoose.connect(`mongodb+srv://dbuser:${process.env.MONGO_KEY}@web322cvbb-2231.8hgrbf6.mongodb.net/web322db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Make the assets folder public
app.use(express.static(path.join(__dirname, "/assets")));

// Set up body-parser
app.use(express.urlencoded({ extended: false }));

const generalController = require("./controllers/generalController");
const rentalController = require("./controllers/rentalController");

app.use("/rentals", rentalController);
app.use("/", generalController);



// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);