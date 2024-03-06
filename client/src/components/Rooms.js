import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { Button, Carousel, CarouselItem, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Rooms = ({ room }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleMouseOver = () => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.imageurls.length);
        }, 1000);

        setIntervalId(intervalId);
    };

    const handleMouseOut = () => {
        clearInterval(intervalId);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.imageurls.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? room.imageurls.length - 1 : prevIndex - 1));
    };
    
    const handleToggle = () => {
        setExpanded(!expanded);
    }

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 20) {
          return words.slice(0, 20).join(' ') + '...';
        }
        return description;
      }

    return (
        <div className="relative h-auto max-w-2xl p-4 rounded-xl shadow-lg mx-5 my-8 bg-white">
            <div className="absolute top-2 right-2">
                <p className="text-xs font-semibold text-gray-800 bg-gray-300 rounded-full px-2 py-1 animate-pulse">Hurry up only: {room.bedLeft} beds left</p>
            </div>
            <div className="absolute top-2 left-2">
                <p className="text-xs font-semibold text-blue-800 mx-2 px-2">{room.type}</p>
            </div>
            <div className='flex'>
            <div className="flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-bold text-gray-800 truncate">{room.name}</h2>
                <div className="relative flex-grow">
                    <img
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        src={room.imageurls[currentImageIndex]}
                        alt="Room"
                        className="h-52 max-w-sm object-cover rounded-lg"
                    />
                    <button onClick={handlePrevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black p-2 rounded-full hover:bg-gray-400">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button onClick={handleNextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black p-2 rounded-full focus:outline-none hover:bg-gray-400">
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 flex justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Location: <span className="text-gray-600">{room.location}</span></p>
                        <p className="text-sm font-semibold text-gray-800">Nearest College: <span className="text-gray-600">{room.address.nearestCollege}</span></p>
                        <p className="text-sm font-semibold text-gray-800">Max Count: <span className="text-gray-600">{room.maxCount}</span></p>
                    </div>
                </div>
                
                <div className="absolute bottom-4 left-4">
                    <div className="flex items-center text-xs text-gray-600">
                        <LocationMarkerIcon className="h-4 w-4 mr-1" />
                        <span>{room.address.street}, {room.address.city}, {room.address.state}, {room.address.country}, {room.address.postalCode}</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <p className="text-sm font-semibold text-gray-800">Amenities:</p>
                <div className="flex flex-col">
                    {room.basicAmmenities.map((amenity, index) => (
                        <div key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">{amenity}</div>
                    ))}
                </div>
                {!expanded && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="cursor-pointer text-blue-600" onClick={handleToggle}> See more</span>
                  </p>
                )}
                {expanded && (
                  <p className="text-sm text-gray-600 mb-2">
                    {truncateDescription(room.description)}
                    <span className="cursor-pointer text-blue-600" onClick={handleToggle}> See less</span>
                  </p>
                )}
                <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-800">Rent: <span className="text-gray-600">₹{room.rentpermonth}/month</span></p>
                        <Button onClick={handleShow} className="text-sm bg-gray-800 text-white rounded-md px-2 py-1 mt-2 mr-2 focus:outline-none">
                            View Details
                        </Button>
                        <Link to={`/book/${room._id}`}>
                            <Button className="text-sm bg-green-500 text-white rounded-md px-2 py-1 mt-2 focus:outline-none">
                                Book Now
                            </Button>
                        </Link>
                  </div>
            </div>
            </div>
            <div className="">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{room.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="m-2 p-2">
                        <Carousel>
                            {room.imageurls.map((image, index) => (
                                <CarouselItem key={index}>
                                    <img src={image} alt={`Room ${index + 1}`} />
                                </CarouselItem>
                            ))}
                        </Carousel>
                        <p className="mt-4 text-gray-700">{room.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" className="bg-blue-700 text-white" onClick={handleClose}>
                            Close
                        </Button>
                        <Link to="/askfromus">
                            <Button variant="" className="bg-green-700 text-white" onClick={handleClose}>
                                Ask from us
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Rooms;
