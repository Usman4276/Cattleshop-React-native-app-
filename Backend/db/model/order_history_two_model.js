const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    imageArray2: {
        type: [String],
        required: true,
    },
    selected_consultant_email2: {
        type: String,
    },
    selected_pickdrop_email2: {
        type: String,    
    },
    cattle_name2: {
        type: String,
        required: true
    },
    cattle_type2: {
        type: String,
        required: true
    },
    cattle_age2: {
        type: Number,
        required: true
    },
    cattle_city2: {
        type: String,
        required: true
    },
    cattle_price2: {
        type: Number,
        required: true
    },
    supplier_email2: {
        type: String,
        require: true
    },
    supplier_name2: {
        type: String,
        require: true
    },
    supplier_phone2: {
        type: String,
        require: true
    },
    customer_fullname2: {
        type: String,
        required: true
    },
    customer_email2: {
        type: String,
        required: true
    },
    customer_phone2: {
        type: Number,
        required: true
    }


})


const SecondOrderHistory = mongoose.model('order_history_two', mySchema);


module.exports = SecondOrderHistory;