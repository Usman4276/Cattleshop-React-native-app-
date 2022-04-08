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
    cnic:{
        type:String,
        require:true
    },
    charges:{
        type:Number,
        require:true
    },
    phone:{
        type:Number,
        require:true
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

const ConsultantModel=mongoose.model('Consultant_reg',mySchema);

module.exports=ConsultantModel;