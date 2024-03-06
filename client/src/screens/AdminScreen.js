import React, { useState } from 'react';
import axios from 'axios';

function AdminScreen() {
    const [roomData, setRoomData] = useState({
        name: '',
        location: '',
        address: {
            nearestCollege: '',
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: ''
        },
        maxCount: 0,
        phonenumber: '',
        rentpermonth: 0,
        imageurls: [],
        basicAmmenities: [],
        currentbookings: [],
        type: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/rooms/saveroom', roomData);
            console.log('Room created successfully:', response.data);
            setRoomData({
                name: '',
                location: '',
                address: {
                    nearestCollege: '',
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    postalCode: ''
                },
                maxCount: 0,
                phonenumber: '',
                rentpermonth: 0,
                imageurls: ['', '', ''],
                basicAmmenities: ['', '', ''],
                currentbookings: [],
                type: '',
                description: '',
                bedLeft:''
            });
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };
    
    const handleImageURLChange = (e, index) => {
      const newImageURLs = [...roomData.imageurls];
      newImageURLs[index] = e.target.value;
      setRoomData({ ...roomData, imageurls: newImageURLs });
  };

  const handleAmenitiesChange = (e, index) => {
      const newAmenities = [...roomData.basicAmmenities];
      newAmenities[index] = e.target.value;
      setRoomData({ ...roomData, basicAmmenities: newAmenities });
  };

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith("address.")) {
        // Extract the field name from the input name
        const fieldName = name.split(".")[1];
        // Update the address object
        setRoomData({
            ...roomData,
            address: {
                ...roomData.address,
                [fieldName]: value
            }
        });
    }
      else{
        setRoomData({ ...roomData, [name]: value });
      }
    };

    return (
      <div className="max-w-xl mx-5">
          <h2 className="text-2xl font-bold mb-4 dark:text-green-500">Admin Room Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4 dark:text-white">
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                  <label className="text-sm font-medium">Room Name:</label>
                  <input type="text" name="name" value={roomData.name} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div>
                  <label className="text-sm font-medium">Beds Left:</label>
                  <input type="text" name="bedLeft" value={roomData.bedLeft} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Location:</label>
                  <input type="text" name="location" value={roomData.location} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Nearest College:</label>
                  <input type="text" name="address.nearestCollege" value={roomData.address.nearestCollege} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Street:</label>
                  <input type="text" name="address.street" value={roomData.address.street} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">City:</label>
                  <input type="text" name="address.city" value={roomData.address.city} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">State:</label>
                  <input type="text" name="address.state" value={roomData.address.state} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Country:</label>
                  <input type="text" name="address.country" value={roomData.address.country} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Postal Code:</label>
                  <input type="text" name="address.postalCode" value={roomData.address.postalCode} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Max Count:</label>
                  <input type="number" name="maxCount" value={roomData.maxCount} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
            </div>

              <div className=''>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Phone Number:</label>
                  <input type="text" name="phonenumber" value={roomData.phonenumber} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Rent Per Month:</label>
                  <input type="number" name="rentpermonth" value={roomData.rentpermonth} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Type:</label>
                  <input type="text" name="type" value={roomData.type} onChange={handleChange} required className="input outline-gray-300 outline dark:text-black" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Description:</label>
                  <textarea name="description" value={roomData.description} onChange={handleChange} className="input outline-gray-300 outline dark:text-black"></textarea>
              </div>

              <div className="grid grid-cols-1 gap-y-4">
                <label className="text-sm font-medium">Image URLs:</label>
                <input type="text" name="image1" value={roomData.imageurls[0]} onChange={(e) => handleImageURLChange(e, 0)} required className="input outline-gray-300 outline" />
                <input type="text" name="image2" value={roomData.imageurls[1]} onChange={(e) => handleImageURLChange(e, 1)} required className="input outline-gray-300 outline" />
                <input type="text" name="image3" value={roomData.imageurls[2]} onChange={(e) => handleImageURLChange(e, 2)} required className="input outline-gray-300 outline" />
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                  <label className="text-sm font-medium">Basic Amenities:</label>
                  <input type="text" name="amenity1" value={roomData.basicAmmenities[0]} onChange={(e) => handleAmenitiesChange(e, 0)} required className="input outline-gray-300 outline" />
                  <input type="text" name="amenity2" value={roomData.basicAmmenities[1]} onChange={(e) => handleAmenitiesChange(e, 1)} required className="input outline-gray-300 outline" />
                  <input type="text" name="amenity3" value={roomData.basicAmmenities[2]} onChange={(e) => handleAmenitiesChange(e, 2)} required className="input outline-gray-300 outline" />
              </div>
             </div>
             <button type="submit" className="btn bg-blue-700 text-white">Submit</button>
          </form>
      </div>
  );
  
}

export default AdminScreen;
