const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    imageArray1: {
        type: [String],
        required: true,
    },
    selected_consultant_email1: {
        type: String,
    },
    selected_pickdrop_email1: {
        type: String,    
    },
    cattle_name1: {
        type: String,
        required: true
    },
    cattle_type1: {
        type: String,
        required: true
    },
    cattle_age1: {
        type: Number,
        required: true
    },
    cattle_city1: {
        type: String,
        required: true
    },
    cattle_price1: {
        type: Number,
        required: true
    },
    supplier_email1: {
        type: String,
        require: true
    },
    supplier_name1: {
        type: String,
        require: true
    },
    supplier_phone1: {
        type: String,
        require: true
    },
    customer_fullname1: {
        type: String,
        required: true
    },
    customer_email1: {
        type: String,
        required: true
    },
    customer_phone1: {
        type: Number,
        required: true
    }
})


const Notification = mongoose.model('notification', mySchema);


module.exports = Notification;