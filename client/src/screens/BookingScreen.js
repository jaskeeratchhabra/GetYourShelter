import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


function BookingScreen() {


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    if (!endDate || date <= endDate) {
      setStartDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    if (!startDate || date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(null);
      setEndDate(date);
    }
  };

  const { roomid } = useParams();

 
  const [Amount,setAmount]=useState();
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
            
            if (startDate !== null && endDate !== null) {
                const daysInBookingPeriod = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            
                const totalRent = Math.ceil(daysInBookingPeriod/30)*room.rentperday;
                
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
   
  async function bookRoom(e){
    e.preventDefault()
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
    <div className='flex justify-around h-auto shadow-lg '>

       <div>
         <label>From : </label>
         <DatePicker
           className='outline-dotted my-2'
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
           className='outline-dotted my-2'
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
    <div className='flex shadow-Xl p-4 m-10 rounded-lg'>
       <div className='flex flex-col'>
          <h1 className=''>{room.name}</h1>
          <img className="h-80 w-auto" src={room.imageurls[0]} alt="room image" />
        </div>
        <div className=''>
          <div className=' relative'>
          <b>
            <p className='p-2'><span className='text-gray-900'>Description: </span>  <span className='text-gray-500'>{room.description}</span></p>
            <p className='p-2'><span className='text-gray-900'>Max Capacity: </span>  <span className='text-gray-500'>{room.maxcount}</span></p>
            <p className='p-2'><span className='text-gray-900'>Owner's Contact: </span> <span className='text-gray-500'>  {room.phonenumber}</span></p>
            <hr></hr>
            <h1 className='p-2 text-xl'>Amount</h1>
            <p className='p-2'><span className='text-gray-900'>Type: </span> <span className='text-gray-500'>{room.type}</span></p>
            <p className='p-2'><span className='text-gray-900'>Rent Per Month: Rs</span><span className='text-gray-500'>{room.rentperday}</span></p>
            <p className='p-2'><span className='text-gray-900'>Total Amount: ₹</span><span className='text-green-500 text-lg'>{Amount}</span></p>

          </b>
          <button className="absolute bottom-30  m-4 bg-blue-800 px-2 py-2 shadow-md rounded-lg text-white" type="submit" onClick={bookRoom}>
           Pay Now</button>
        </div>
       </div> 
       </div>
    </div>
    </div>
  );
}

export default BookingScreen;