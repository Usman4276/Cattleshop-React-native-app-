const mongoose=require('mongoose');

const mySchema=mongoose.Schema({
    
    image:{
        type:[String],
        required:true,
    },
    cattle_name:{
        type:String,
        required:true
    },
    cattle_type:{
        type:String,
        required:true
    },
    cattle_age:{
        type:Number,
        required:true
    },
    cattle_des:{
        type:String,
        required:true
    },
    cattle_city:{
        type:String,
        required:true
    },
    cattle_price:{
        type:Number,
        required:true
    },
    supplier_email:{
        type:String,
        require:true
    },
    supplier_name:{
        type:String,
        required:true
    },
    supplier_phone:{
        type:Number,
        required:true
    }
    
})


const MyCattle=mongoose.model('cattle_list',mySchema);


module.exports=MyCattle;