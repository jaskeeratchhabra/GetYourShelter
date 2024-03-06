const express=require("express");
const cors= require("cors");

const  app=express();

// app.use(cors(
//     {
//         origin:[""],
//         methods:["POST", "GET"],
//         credentials:true
//     }
// ))

const dbConfig=require('./dbSetup');

const usersRoute=require("./routes/userRoute")

const roomsRoute=require('./routes/roomsRoute')

const bookingRoute=require("./routes/bookingRoute");

app.use(express.json());

// app.use("/",(req,res)=>{
//     res.send("server is running new");
// })
app.use('/api/book',bookingRoute)

app.use('/api/users',usersRoute)
app.use('/api/rooms',roomsRoute)

const port= process.env.PORT || 5000;
app.listen(port,()=> (console.log(`server runnning on port ${port}`))) ;
