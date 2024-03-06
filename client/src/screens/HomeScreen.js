import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import Rooms from '../components/Rooms.js';
import Loading from '../components/Loading.js';
// import { useLocation, useParams } from 'react-router-dom';
function HomeScreen() {

  // const location =useLocation();
  const [rooms,setRooms]=useState([]);
  const [loading,setLoading]=useState("false");
  const [error,setError]=useState()
 
  // const {country, state, city, locality} = useParams();

  // if(location.pathname.startsWith('/location')){
  //   console.log(`${country} ${state} ${locality} ${city}`);
  // }
  
  // useEffect(()=>{
     
  // },[])
  useEffect(()=>{

    // if(location.pathname.startsWith('/location')){
    //   console.log(`${country} ${state} ${locality} ${city}`);
    // }
    const fetchData=async()=>{
        try{
          setLoading(true);
           const data=(await axios.get('/api/rooms/getallrooms')).data;
           setRooms(data);
           setLoading(false);
           console.log(data);
        }
        catch(error){
          setError(true);
           console.log(error);
           setLoading(false)
        }
    }
    fetchData();
},[])


  return (
    <div  className="flex flex-wrap dark:bg-gray-700">
       {loading?(<Loading/>): error?(<h1>error</h1>):(
        rooms.map((room,id)=>{
          return <div key={id}>
            <Rooms room={room}/>
          </div>
        }))
       }
  </div>
)
}

export default HomeScreen;