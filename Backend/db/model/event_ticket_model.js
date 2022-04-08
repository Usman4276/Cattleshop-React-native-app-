const mongoose = require('mongoose');

const mySchema = mongoose.Schema({


    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cnic: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },

    
})


const EventTicket = mongoose.model('event_ticket', mySchema);


module.exports = EventTicket;