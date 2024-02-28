const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema (pattern for all documents in this collection)
const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: 1,
        max: 99
    },
    dough: {
        type: String,
        enum: ["classic", "extra thin", "with cheese"]
    },
    isVeggie: {
        type: Boolean,
        default: false
    },
    ingredients: [String],
});

//create Model 
const Pizza = mongoose.model("Pizza", pizzaSchema);


module.exports = Pizza;
