const mongoose = require('mongoose');

const mySchema = mongoose.Schema({

    cattle_id:{
        type:String,
        require:true
    },
    cattle_status: {
        type: String,
        require:true
    }
})


const StockStatus = mongoose.model('stock_status', mySchema);


module.exports = StockStatus;