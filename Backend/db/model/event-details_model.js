const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    event_detail: {
        type: [Object],
        require: true
    },
    img_name: {
        type: String,
        require: true
    }

})


const EventDetail = mongoose.model('event_detail', mySchema);


module.exports = EventDetail;