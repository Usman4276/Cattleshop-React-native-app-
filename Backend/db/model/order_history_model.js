const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    cart_data1: {
        type: Object,
        required: true,
    },
    selected_consultant_email1: {
        type: String,
    },
    selected_pickdrop_email1: {
        type: String,
    }
})


const OrderHistory = mongoose.model('order_history', mySchema);


module.exports = OrderHistory;