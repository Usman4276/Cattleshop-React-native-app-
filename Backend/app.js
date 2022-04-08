const express= require('express');
const cors=require('cors');
const app=express();
const path=require('path');
app.use(express.json());
app.use(cors());

//Routers
const myRouter=require('./routers/auth');

//Db Connections
require('./db/connection/conn');

//Static path for image uploads
const staticPath=path.join(__dirname,'../public');

app.use(express.static(staticPath));

const port=9000;

//Calling routers file
app.use(myRouter);


//Listening to the port
app.listen(port,()=>{
    console.log(`Port is active at ${port} 👍`);
})

