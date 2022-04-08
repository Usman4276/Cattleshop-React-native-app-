const mongoose=require('mongoose');
// const db='mongodb+srv://Ahmad:Ahmad123@cluster0.ess1v.mongodb.net/CattleShop?retryWrites=true&w=majority';
const db='mongodb+srv://Usman:usman12@firstcluster.1jwsa.mongodb.net/CattleShop?retryWrites=true&w=majority';


mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('Connection to DB successfull 🟩');
}).catch((error)=>{
    console.log('No connection to DB 😡');
    console.log(error);
})