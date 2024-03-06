import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import Rooms from '../components/Rooms.js';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading.js';

function LocationScreen() {

    
//   const location =useLocation();
  const [rooms,setRooms]=useState([]);
  const [loading,setLoading]=useState("false");
  const [error,setError]=useState()
 
  const {country, state, city, locality} = useParams();

  useEffect(()=>{
    async function fetchData(){
      const location={country,state,city,locality};
         try{
             setLoading(true);
             const data=(await axios.post("/api/rooms/getroombylocation",location)).data;
             console.log(data);
             setRooms(data)
             setLoading(false);
         }
         catch(error){
            setError(true);
            console.log(error);
            setLoading(false);
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

export default LocationScreen
