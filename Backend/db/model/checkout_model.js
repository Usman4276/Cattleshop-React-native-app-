const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    cart_data: {
        type: Object,
        required: true,
    },
    selected_consultant_email: {
        type: String,
    },
    selected_pickdrop_email: {
        type: String,
    }
})


const Checkout = mongoose.model('checkout', mySchema);


module.exports = Checkout;