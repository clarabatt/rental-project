
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./keys.env" });

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");


app.use(express.static(path.join(__dirname, "/assets")));

app.use(express.urlencoded({ extended: false }));

const generalController = require("./controllers/generalController");
app.use("/", generalController);

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
app.listen(HTTP_PORT, onHttpStart);