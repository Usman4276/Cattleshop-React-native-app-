const mongoose=require('mongoose');

const mySchema=mongoose.Schema({
    
    imgArray:{
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
    supplier_name:{
        type:String,
        required:true
    },
    supplier_email:{
        type:String,
        required:true
    },
    supplier_phone:{
        type:Number,
        required:true
    }
    
})


const MyCart=mongoose.model('cart',mySchema);


module.exports=MyCart;