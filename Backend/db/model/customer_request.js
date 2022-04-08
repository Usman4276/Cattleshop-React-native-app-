const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    imageArray: {
        type: [String],
        required: true,
    },
    selected_consultant_email: {
        type: String,
    },
    selected_pickdrop_email: {
        type: String,    
    },
    cattle_name: {
        type: String,
        required: true
    },
    cattle_type: {
        type: String,
        required: true
    },
    cattle_age: {
        type: Number,
        required: true
    },
    cattle_city: {
        type: String,
        required: true
    },
    cattle_price: {
        type: Number,
        required: true
    },
    supplier_email: {
        type: String,
        require: true
    },
    supplier_name: {
        type: String,
        require: true
    },
    supplier_phone: {
        type: String,
        require: true
    },
    customer_fullname: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_phone: {
        type: Number,
        required: true
    }


})


const CustomerRequest = mongoose.model('customer_request', mySchema);


module.exports = CustomerRequest;