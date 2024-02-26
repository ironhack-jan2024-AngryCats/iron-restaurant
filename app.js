// First, we have to require Express so we can use it in our app.
const express = require('express');
 
// Create an express server instance named `app`
// `app` is the Express server that will be handling requests and responses
const app = express();

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
// (Configure Express to be able to read incoming HTTP request that contain JSON data in the body.)
app.use(express.json());



/*
app.get(path, (req, res, next) => {
    res.send("hello world");
    res.sendFile();
    res.json();
})
*/



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




// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000! "));