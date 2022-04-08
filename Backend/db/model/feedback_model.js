const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    comment: {
        type: Object,
    },
    customer_name: {
        type: String
    },
    cattle_id: {
        type: String
    }

})


const Feedback = mongoose.model('feedback', mySchema);


module.exports = Feedback;