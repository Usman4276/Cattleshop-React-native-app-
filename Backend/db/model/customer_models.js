const bcrypt=require('bcrypt');
const mongoose=require('mongoose');

const mySchema=mongoose.Schema({
    
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})


//Bcrypting the password
mySchema.pre('save',async function(next){
    console.log('from bycrypt');
    if(this.isModified('password')){

        this.password=await bcrypt.hash(this.password,12);

    }
    next();
})

const CustomerModel=mongoose.model('Customer_reg',mySchema);


module.exports=CustomerModel;