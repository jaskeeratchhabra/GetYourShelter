import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


function BookingScreen() {


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const  user = JSON.parse(localStorage.getItem("user"));
  const handleStartDateChange = (date) => {
    if (!endDate || date <= endDate) {
      setStartDate(date);
    } else {
      setStartDate(date);
      setEndDate("");
    }
  };

  const handleEndDateChange = (date) => {
    if (!startDate || date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate("");
      setEndDate(date);
    }
  };

  const { roomid } = useParams();

 
  const [Amount,setAmount]=useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState({});
  const [month,setMonths]=useState(0);

  useEffect(() => {
    async function fetchData() {
        try {
            setLoading(true);
            let data = (await axios.post("/api/rooms/getroombyid", { roomid })).data;
            setRoom(data);
            
            if (startDate !== "" && endDate !== "") {
                const daysInBookingPeriod = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            
                const totalRent = Math.ceil(daysInBookingPeriod/30)*room.rentpermonth;
                
                setMonths(Math.ceil(daysInBookingPeriod/30));
                setAmount(totalRent);
            } 

            setLoading(false);
        } catch (error) {
            setError(error.message);
            console.log(error);
            setLoading(false);
        }
    }
    
    fetchData();
}, [startDate, endDate, roomid]);
   
function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}

async function displayRazorpay() {
const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
);

if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
}

// creating a new order
const result = await axios.post("/api/payments/orders",{price:Amount

  
});

if (!result) {
    alert("Server error. Are you online?");
    return;
}

// Getting the order details back
const { amount, id: order_id, currency } = result.data;

const options = {
    key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: "pgDekho.com",
    description: `Your payment for booking room` ,
    image: "",
    order_id: order_id,
    handler: async function (response) {
        const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("/api/payments/success", data);
        if(result.msg==="success")
          {
            const bookingDetails={
              room:room.name,
              roomid:room._id,
              userid:JSON.parse(localStorage.getItem("user"))._id,
              fromdate:startDate,
              todate:endDate,
              totalamount:Amount,
              totalmonths:month,
            }
            try{
               
               const result= (await axios.post("/api/book/bookroom",bookingDetails)).data;
               console.log(result);
            }
            catch(error){
              console.log(error);
            }
          }
        alert(result.data.msg);
    },
    prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
    },
    notes: {
        address: "114, Street no 16, Wazirabad Village, New delhi, 110084",
    },
    theme: {
        color: "#61dafb",
    },
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
}


  async function bookRoom(){
    const bookingDetails={
      room:room.name,
      roomid:room._id,
      userid:JSON.parse(localStorage.getItem("user"))._id,
      fromdate:startDate,
      todate:endDate,
      totalamount:Amount,
      totalmonths:month,
    }
    try{
       
       const result= (await axios.post("/api/book/bookroom",bookingDetails)).data;
       console.log(result);
    }
    catch(error){
      console.log(error);
    }
  }


  if (loading) {
    return <h1><Loading/></h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
   <div> 
    {!endDate && <h1 className="text-center text-2xl font-bold text-blue-700 mb-8 shadow-md py-4 px-6 rounded-lg animate-bounce"> Select Dates to Continue</h1>}
    <div className='flex justify-around h-auto  '>

       <div>
         <label>From : </label>
         <DatePicker
           className='border-b-2 rounded-lg text-center border-blue-700 my-2'
           selected={startDate}
           onChange={handleStartDateChange}
           selectsStart
           startDate={startDate}
           endDate={endDate}
           minDate={Date.now()}
           dateFormat="dd/MM/yyyy"
         />
       </div>
       <div>
         <label>To : </label>
         <DatePicker
           className='border-b-2 text-center rounded-lg border-blue-700 my-2'
           selected={endDate}
           onChange={handleEndDateChange}
           selectsEnd
           startDate={startDate}
           endDate={endDate}
           minDate={startDate}
           dateFormat="dd/MM/yyyy"
         />
         </div>
      </div>
    <div>
    <div className='flex shadow-md p-4 m-10'>
       <div className='flex flex-col'>
          <h1 className='font-semibold mb-2'>{room.name}</h1>
          <img className="h-80 w-auto rounded-lg" src={room.imageurls[0]} alt="room image" />
        </div>
        <div className='w-fit'>
          <div className=' relative ml-10 mr-2'>
            <p className='p-2'><span className=''>Description: </span>  <span className='text-gray-500'>{room.description}</span></p>
            <p className='p-2'><span className=''>Max Capacity: </span>  <span className='text-gray-500'>{room.maxCount}</span></p>
            <p className='p-2'><span className=''>Owner's Contact: </span> <span className='text-gray-500'>  {room.phonenumber}</span></p>
            <hr></hr>
            <h1 className='p-2 text-xl'>Amount</h1>
            <p className='p-2'><span className=''>Type: </span> <span className='text-gray-500'>{room.type}</span></p>
            <p className='p-2'><span className=''>Rent Per Month: ₹</span><span className='text-gray-500'>{room.rentpermonth}</span></p>
           {Amount && <p className='p-2'><span className=''>Total Amount: ₹</span><span className='text-green-500 text-lg'>{Amount}</span></p>}
             <div className='flex'>
               <div className='flex'>
                 {Amount &&  <button className="ml-2 mt-5 mr-4 bg-blue-800 px-2 py-2 shadow-md rounded-lg text-white" type="submit" onClick={displayRazorpay} >
                  Pay Now</button>}
               </div>
               { startDate &&  endDate &&  
                <div className='flex flex-col mt-5'>
                 <div>
                   <button onClick={bookRoom} className="ml-2 bg-green-500 px-2 py-2 shadow-md rounded-lg text-white">BookNow</button>
                 </div>
  
                </div>
               }
             </div>
            <span className=''>You can book here and can pay rest amount at property</span>
        </div>
       </div> 
       </div>
    </div>
    </div>
  );
}

export default BookingScreen;