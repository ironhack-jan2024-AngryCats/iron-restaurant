const express = require('express');
const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model");
 
// Create an express server instance named `app`
// `app` is the Express server that will be handling requests and responses
const app = express();

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// Configure Express to be able to read incoming HTTP request that contain JSON data in the body.
app.use(express.json());


// Connect to DB
mongoose
    .connect("mongodb://127.0.0.1:27017/iron-restaurant")
    .then((response) => {
        console.log(`Connected! Database Name: "${response.connections[0].name}"`);
    })
    .catch((err) => console.error("Error connecting to Mongo", err));




// GET /
app.get("/", (req, res, next) => {
    // res.send(`<h1>Welcome to IronRestaurant</h1>`)
    res.sendFile(__dirname + '/views/home-page.html');
});



// GET /contact
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + '/views/contact.html');
})



// POST /pizzas
app.post("/pizzas", (req, res, next) => {

    const {title, price} = req.body;

    Pizza.create({title, price})
        .then( (pizzaFromDB) => {
            res.json(pizzaFromDB)
        })
        .catch( (e) => {
            console.log("Error creating a new pizza");
            console.log(e)
            res.status(500).json({message: "Error creating a new pizza"})
        });
});



// GET /pizzas
app.get("/pizzas", (req, res, next) => {
    Pizza.find()
        .then( (pizzasFromDB) => {
            res.json(pizzasFromDB);
        })
        .catch( (e) => {
            console.log("Error getting list of pizzas");
            console.log(e)
            res.status(500).json({message: "Error getting list of pizzas"})
        });
});



// GET /pizzas/:pizzaTitle 
app.get("/pizzas/:pizzaTitle", (req, res, next) => {
    const {pizzaTitle} = req.params;

    Pizza.findOne({title: pizzaTitle})
        .then( (pizzaDetails) => {
            res.json(pizzaDetails);
        })
        .catch( (e) => {
            console.log("Error getting pizza details");
            console.log(e)
            res.status(500).json({message: "Error getting pizza details"})
        });
})




// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000! "));