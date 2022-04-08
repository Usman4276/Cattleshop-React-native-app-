const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    customer_email: {
        type: Number
    }
})


const Ratings = mongoose.model('rating', mySchema);


module.exports = Ratings;