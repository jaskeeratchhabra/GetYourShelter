const express = require("express");
const router = express.Router();
const Booking = require('../models/booking');
const Room=require("../models/rooms")
router.post("/bookroom",async(req,res)=>{
    const {
        room,
        roomid,
        userid,
        fromdate,
        todate,
        totalamount,
        totalmonths
    }=req.body
    try{
        const newbooking = new Booking({
            room,
            roomid,
            userid,
            fromdate,
            todate,
            totalamount,
            totalmonths,
            transactionId:"1234"
        })
        const booking = await newbooking.save()  
        
        const roomBook = await Room.findOne({_id:roomid});
        
        roomBook.currentbookings.push({bookingid: booking._id,fromdate,todate})
        console.log(roomBook)
        if(roomBook.currentbookings.length>0){
            console.log(roomBook.currentbookings.length)
            console.log("record saved");
        }
        else{
            console.log("record not saved");
        }

        console.log("booking successfull")
        return res.send(booking);
    }
    catch(error){
        console.log(error.message);
    }
})
module.exports = router
