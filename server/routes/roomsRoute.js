const express = require("express");
const router = express.Router();
const Room = require('../models/rooms');


router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.send(rooms);
    } catch (error) {
        console.error("Error fetching all rooms:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/getroombyid", async (req, res) => {
    const id = req.body.roomid;
    try {
        const room = await Room.findOne({_id:id});
        return res.send(room);
    } catch (error) {
        console.error("Error fetching room by ID:", error);
        return res.status(400).json({ error: error.message });
    }
});

router.post("/saveroom",async(req,res)=>{
    try{
        const newroom =new Room(req.body);
        await newroom.save();
        console.log("room data saved");
        res.send("rooms saved successfully");
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }

})

router.post("/getroombylocation",async(req,res)=>{
    const {country,state,city,locality} = req.body;
    try{
       const address={
           "address.country" : country,
           "address.state": state,
           "address.city": city,
           "address.street" :locality
       }
    //    console.log(address);
       const  filtered = await Room.find(address);
       console.log(filtered);
       console.log("success sent filtered data");
       return res.send(filtered);
    }
    catch(error){
       console.log(error.message);
    }
})


module.exports = router;
