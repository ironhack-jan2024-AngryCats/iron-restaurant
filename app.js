// First, we have to require Express so we can use it in our app.
const express = require('express');
 
// Create an express server instance named `app`
// `app` is the Express server that will be handling requests and responses
const app = express();

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// Configure Express to be able to read incoming HTTP request that contain JSON data in the body.
app.use(express.json());






// GET /
app.get("/", (req, res, next) => {
    // res.send(`<h1>Welcome to IronRestaurant</h1>`)
    res.sendFile(__dirname + '/views/home-page.html');
});



// GET /contact
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + '/views/contact.html');
})


// GET /pizzas
app.get("/pizzas", (req, res, next) => {

    const pizzasArr = [
        {
            title: 'Pizza Margarita',
            price: 12,
            imageFile: 'pizza-margarita.jpg',
        },
        {
            title: "Veggie Pizza",
            price: 15,
            imageFile: "pizza-veggie.jpg"
        },
        {
            title: "Seafood Pizza",
            imageFile: "pizza-seafood.jpg"
        }
    ];

    res.json(pizzasArr);
});


// Example of req.body
app.post("/drinks", (req, res, next) => {
    const {name, price} = req.body;
    res.json({"message": `this will create a new drink with name.... ${name}`})
})


// Example of Query String (req.query)
app.get("/drinks", (req, res, next) => {

    const {maxPrice} = req.query;

    res.json({"message": `this will be the list of drinks with max price... ${maxPrice}`});
})



// Example of URL params (req.params)
app.get("/drinks/:drinkName", (req, res, next) => {
    const {drinkName} = req.params;
    res.json({"message": `this will be the details for the drink... ${drinkName}`});
})



// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000! "));